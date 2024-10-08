import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaMGService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaMGService,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpData: SignUpDto) {
    const { email, username, password } = signUpData;
    const existUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existUser) {
      throw new BadRequestException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, username },
    });
    return user;
  }
  async login(credentials: LoginDto) {
    const { email, password } = credentials;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new UnauthorizedException('Wrong credentials');
    }
    await this.prisma.refreshToken.delete({
      where: { userId: user.id },
    });
    const tokens = await this.generateUserTokens(user.id);

    return { userId: user.id, ...tokens };
  }

  async generateUserTokens(userId: string) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    await this.saveRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
  }
  async saveRefreshToken(refreshToken: string, userId: string) {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 3);
    await this.prisma.refreshToken.create({
      data: { token: refreshToken, userId, expireDate },
    });
  }
  async refreshTokens(refreshToken: string) {
    const token = await this.prisma.refreshToken.findFirst({
      where: {
        token: refreshToken,
        expireDate: { gte: new Date() },
      },
    });
    if (!token) {
      throw new UnauthorizedException('Refresh token not valid');
    }
    await this.prisma.refreshToken.delete({ where: token });
    const newTokens = await this.generateUserTokens(token.userId);

    return newTokens;
  }
}

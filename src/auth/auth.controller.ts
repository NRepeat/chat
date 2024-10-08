import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @Post('login')
  login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }
  @Post('refresh')
  async refreshTokens(@Body() data: RefreshTokenDto) {
    return this.authService.refreshTokens(data.refreshToken);
  }
}

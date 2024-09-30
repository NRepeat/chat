import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useFetcher, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/store/user';

const Login = () => {
  const fetcher = useFetcher({ key: 'login' });
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const nav = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = { test: 'test', ...values };
    fetcher.submit(data, {
      action: '',
      encType: 'application/json',
      method: 'POST',
    });
  }
  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data && user) {
      setLoading(false);
      setUser({
        id: user.id,
        status: 'online',
        avatar: '',
        username: fetcher.data.username,
      });
    } else if (fetcher.state === 'submitting') {
      setLoading(true);
    } else if (fetcher.state === 'loading') {
      setLoading(true);
    }
  }, [fetcher, setUser, user]);
  useEffect(() => {
    if (!loading && user?.username) {
      nav('/chat');
    }
  }, [loading, user, nav]);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="User" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default Login;

// src/auth/infrastructure/auth.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDto } from '../application/dto/login.dto';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.loginUseCase.execute(dto.email, dto.password);
    console.log("🚀 ~ file: auth.controller.ts:15 ~ refreshToken:", refreshToken)
    console.log("🚀 ~ file: auth.controller.ts:15 ~ accessToken:", accessToken)

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    return { message: 'Inicio de sesión exitoso' };
  }
}

// src/auth/infrastructure/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { AuthService } from '../application/auth.service';
import { MongooseUserRepository } from './repositories/mongoose-user.repository';
import { UserRepository } from '../domain/repositories/user.repository.interface';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './repositories/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'), // Clave desde .env
        signOptions: { 
          expiresIn: configService.get<string>('JWT_EXPIRES_IN', '12h'), // Default: 12h
        },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    LoginUseCase,
    AuthService,
    {
      provide: 'UserRepository',
      useClass: MongooseUserRepository,
    },
  ],
})
export class AuthModule {}

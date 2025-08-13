import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(user: { uuid: string; email: string }, expiresIn = '15m') {
    return this.jwtService.signAsync(
      { uuid: user.uuid, email: user.email },
      { expiresIn },
    );
  }

  async verifyToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}

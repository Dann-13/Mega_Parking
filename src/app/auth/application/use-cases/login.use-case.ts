import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth.service';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepo: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async execute(email: string, password: string): Promise<{ token: string }> {
  const user = await this.userRepo.findByEmail(email);
  if (!user) throw new UnauthorizedException('Credenciales inválidas');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new UnauthorizedException('Credenciales inválidas');

  const token = await this.authService.generateToken({ uuid: user.uuid, email: user.email });
  return { token };
}

}

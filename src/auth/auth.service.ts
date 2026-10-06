import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userservice: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    try {
      const user = await this.userservice.findByEmail(dto.email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const isValid = await bcrypt.compare(dto.password, user.password);
      if (!isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const payload = {
        sub: user.id,
        email: user.email,
      };
      return { access_token: await this.jwtService.signAsync(payload) };
    } catch {
      throw new NotFoundException();
    }
  }
}

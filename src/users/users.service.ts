import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async createUser(dto: CreateUserDto) {
    const existinguser = await this.userModel.findOne({ email: dto.email });
    if (existinguser) {
      throw new ConflictException('Email already registered');
    }
    const hashPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({
      ...dto,
      password: hashPassword,
    });

    return { id: user.id, name: user.name, email: user.email };
  }
  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}

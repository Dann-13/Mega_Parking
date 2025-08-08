// src/auth/infrastructure/repositories/mongoose-user.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository, User } from '../../domain/repositories/user.repository.interface';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) { }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await this.userModel.findOne({ email }).lean();

    if (!userDoc) return null;

    return {
      id: userDoc._id.toString(),
      email: userDoc.email,
      password: userDoc.password,
      uuid: userDoc.uuid,
    };
  }
}

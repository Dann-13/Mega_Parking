// src/auth/infrastructure/repositories/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'userowners' })
export class UserDocument {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  uuid: string;

}

export type UserDocumentType = HydratedDocument<UserDocument>;

export const UserSchema = SchemaFactory.createForClass(UserDocument);

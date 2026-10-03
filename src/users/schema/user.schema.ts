import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: true,

    unique: true,

    default: uuidv4,
  })
  id!: string;

  @Prop({
    required: true,
  })
  name!: string;

  @Prop({
    required: true,

    unique: true,
  })
  email!: string;

  @Prop({
    required: true,
  })
  password!: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

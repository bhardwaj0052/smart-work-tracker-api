import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type TaskDocument = HydratedDocument<Task>;
@Schema()
export class Task {
  @Prop({
    unique: true,
    required: true,
    default: uuidv4,
  })
  id!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ default: 'todo', enum: ['todo', 'in-progress', 'done'] })
  status!: string;

  @Prop({ default: 'medium', enum: ['low', 'medium', 'high'] })
  priority!: string;
}
export const TaskSchema = SchemaFactory.createForClass(Task);

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schema/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskmodel: Model<TaskDocument>,
  ) {}

  async getTasks(
    userId: string,
    status?: string,
    search?: string,
    priority?: string,
  ) {
    try {
      let query = this.taskmodel.find({ userId });

      if (status) {
        query = query.find({
          status: { $regex: `^${status}$`, $options: 'i' },
        });
      }
      if (priority) {
        query = query.find({
          priority: { $regex: `^${priority}$`, $options: 'i' },
        });
      }
      if (search) {
        query = query.find({
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
          ],
        });
      }

      return await query;
    } catch {
      throw new NotFoundException();
    }
  }

  async getTaskById(id: string, userId: string) {
    try {
      const task = await this.taskmodel.findOne({ id, userId });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return task;
    } catch {
      throw new NotFoundException();
    }
  }

  async createTask(dto: CreateTaskDto, userId: string) {
    try {
      return await this.taskmodel.create({ ...dto, userId: userId });
    } catch {
      throw new NotFoundException();
    }
  }

  async updateTask(id: string, dto: UpdateTaskDto, userId: string) {
    try {
      const task = await this.taskmodel.findOneAndUpdate({ id, userId }, dto, {
        returnDocument: 'after',
        runValidators: true,
      });
      // const taskss= await this.taskmodel.findOne({id})
      // Object.assign(taskss,dto)
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      // return task.save();
      return task;
    } catch {
      throw new NotFoundException();
    }
  }

  async deleteTask(id: string, userId: string) {
    try {
      const task = await this.taskmodel.findOneAndDelete({ id, userId });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return 'deleted successfully';
    } catch {
      throw new NotFoundException();
    }
  }
}

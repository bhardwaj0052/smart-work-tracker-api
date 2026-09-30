import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.controller';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Learn NestJS basics',
      description: 'Understand modules, controllers and services',
      priority: 'high',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Build React dashboard',
      description: 'Create task list UI using React',
      priority: 'medium',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'Create authentication API',
      description: 'Build login endpoint with validation',
      priority: 'high',
      status: 'pending',
    },
    {
      id: 4,
      title: 'Write API documentation',
      description: 'Document all task endpoints in Postman',
      priority: 'low',
      status: 'pending',
    },
    {
      id: 5,
      title: 'Connect React with NestJS',
      description: 'Fetch tasks from backend using fetch',
      priority: 'medium',
      status: 'completed',
    },
  ];
  getTasks(status?: string, search?: string) {
    let result = this.tasks;
    if (status) {
      result = result.filter((item) => item.status === status);
    }
    if (search) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.priority.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return result;
  }
  gettaskbyid(id: string): Task | string {
    const result = this.tasks.find((item) => item.id === Number(id));
    if (!result) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }
  createtask(body: Task): Task | string {
    if (
      !body ||
      !body.title.trim() ||
      !body.description.trim() ||
      !body.priority.trim() ||
      !body.status.trim()
    ) {
      return 'Data is missing';
    }
    this.tasks.push({ ...body, id: this.tasks.length + 1 });
    return body;
  }
}

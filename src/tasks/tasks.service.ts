import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getTasks() {
    return [
      {
        id: 1,
        title: 'Learn NestJS',
        status: 'pending',
      },
      {
        id: 2,
        title: 'Build REST API',
        status: 'in-progress',
      },
      {
        id: 3,
        title: 'Connect React',
        status: 'pending',
      },
    ];
  }
}

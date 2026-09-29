import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getTasks() {
    return [
      {
        id: 1,
        name: 'Rahul',
        email: 'Rahul@gmail.com',
      },
      {
        id: 2,
        name: 'Akash',
        email: 'in-progress',
      },
    ];
  }
}

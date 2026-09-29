import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

interface Task {
  id: number;
  title: string;
  status: string;
}

@Controller()
export class TasksController {
  constructor(private readonly tasksservice: TasksService) {}
  @Get('tasks')
  getTasks(): Task[] {
    return this.tasksservice.getTasks();
  }
}

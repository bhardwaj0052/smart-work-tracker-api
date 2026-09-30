import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksservice: TasksService) {}
  @Get()
  getTasks(
    @Query('status') status?: string,
    @Query('search') search?: string,
  ): Task[] {
    return this.tasksservice.getTasks(status, search);
  }
  @Get(':id')
  gettaskbyid(@Param('id') id: string): Task | string {
    return this.tasksservice.gettaskbyid(id);
  }
  @Post()
  createtask(@Body() body: Task): Task | string {
    return this.tasksservice.createtask(body);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('priority') priority?: string,
  ) {
    return this.tasksService.getTasks(status, search, priority);
  }

  @Get(':id')
  getTaskById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Patch(':id')
  updateTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.tasksService.updateTask(id, dto);
  }

  @Delete(':id')
  deleteTask(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tasksService.deleteTask(id);
  }
}

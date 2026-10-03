/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Body,
  Controller,
  Delete,
  Get,
  Req,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Req() req: any,
    @Query('status') status?: string,
    @Query('search') search?: string,
    @Query('priority') priority?: string,
  ) {
    return this.tasksService.getTasks(req.user.sub, status, search, priority);
  }

  @Get(':id')
  getTaskById(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: any) {
    return this.tasksService.getTaskById(id, req.user.sub);
  }

  @Post()
  createTask(@Body() dto: CreateTaskDto, @Req() req: any) {
    return this.tasksService.createTask(dto, req.user.sub);
  }

  @Patch(':id')
  updateTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateTaskDto,
    @Req() req: any,
  ) {
    return this.tasksService.updateTask(id, dto, req.user.sub);
  }

  @Delete(':id')
  deleteTask(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: any) {
    return this.tasksService.deleteTask(id, req.user.sub);
  }
}

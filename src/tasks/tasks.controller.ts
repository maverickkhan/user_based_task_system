import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-pipe-validation';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    // @Get()
    // getAllTasks(): Tasks[] {
    //     return this.taskService.getAllTasks();
    // }
    
    @Get('/:id')
    getTaskByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskbyId(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTasks(@Body() CreateTaskDto: CreateTaskDto): Promise<Task>
    {
        return this.taskService.createTasks(CreateTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id:number): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    @Patch('/:id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TasksStatus): Promise<Task> {
        return this.taskService.updateTask(id, status);
    }   
}

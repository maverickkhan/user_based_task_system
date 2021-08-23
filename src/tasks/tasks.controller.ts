import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.dectorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/taskFilterDTO';
import { TaskStatusValidationPipe } from './pipes/task-status-pipe-validation';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {
    }

    @Get('/getAll')
    async getAllTasks(): Promise<any> {
        return await this.taskService.getAllTasks();
    }
    
    @Get('getTasks')
    async getTasks(
        @Query(ValidationPipe)  filterDto :GetTaskFilterDTO,
        @GetUser() user: User
        ): Promise<any> {
        return await this.taskService.getTasks(filterDto, user);
    }
    
    @Get(':id')
    getTaskByID(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<Task> {
            console.log('get task by id')
        return this.taskService.getTaskbyId(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTasks(
        @Body() CreateTaskDto: CreateTaskDto,
        @GetUser() user: User
        ): Promise<Task>
    {
        return this.taskService.createTasks(CreateTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id:number): Promise<void> {
        return this.taskService.deleteTask(id);
    }

    // @Patch('/:id')
    // updateTask(@Param('id', ParseIntPipe) id: number, @Body('status', TaskStatusValidationPipe) status: TasksStatus): Promise<Task> {
    //     return this.taskService.updateTask(id, status);
    // }   
}

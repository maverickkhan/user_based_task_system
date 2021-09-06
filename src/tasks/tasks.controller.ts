import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
    private logger = new Logger('task controller');
    constructor(
        private taskService: TasksService
        ) {
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
        this.logger.verbose(`User ${user.username} is trying to retrieve all task using filters: ${JSON.stringify(filterDto)}`)
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
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
        ): Promise<Task>
    {
        this.logger.verbose(`user ${user.username} is trying to create a task, Data: ${JSON.stringify(createTaskDto)}`)
        return this.taskService.createTasks(createTaskDto, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id:number,
        @GetUser() user: User
        ): Promise<void> {
        return this.taskService.deleteTask(id, user);
    }

    @Patch('/:id')
    updateTask(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status', TaskStatusValidationPipe) status: TasksStatus,
        @GetUser() user: User
        ): Promise<Task> {
        return this.taskService.updateTask(id, status, user);
    }   
}

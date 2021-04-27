import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
    constructor (   
        @InjectRepository(TaskRepository)
        private TaskRepository: TaskRepository
        ){

    }

    // getAllTasks(): Tasks[]{
    //     return this.tasks;
    // }

    async getTaskbyId(id: number):Promise<Task>{
        const found = await this.TaskRepository.findOne(id);
        if (!found){
                    throw new NotFoundException(`Task with the "${id}" not found!`);
                }
        return found
    }
    // getTaskById(id: string): Tasks{
    //     const found = this.tasks.find(tasks => tasks.id === id)

    //     if (!found){
    //         throw new NotFoundException(`Task with the "${id}" not found!`);
    //     }
    //     return found;
    // }

    // deleteTask(id: string): void{
    //     //return this.tasks.find(tasks => tasks.id === id)
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(tasks => tasks.id !== found.id)
    // }

    async createTasks(CreateTaskDto: CreateTaskDto): Promise<Task>{
        const {title, description} = CreateTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TasksStatus.OPEN;
        await task.save();

        return task;
    }

    // createTasks(CreateTaskDto: CreateTaskDto): Tasks {
    //     const {title, description} = CreateTaskDto;
    //     const task: Tasks = {
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TasksStatus.OPEN,
    //     };
    
    // this.tasks.push(task);
    // return task; 
    // }
    
    // updateTask(id: string, status: TasksStatus){
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/taskFilterDTO';
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

    async getAllTasks(): Promise<any>{
        return await this.TaskRepository.find();
    }

    getTasks(
        filterDto :GetTaskFilterDTO,
        user: User
        ){
    return this.TaskRepository.getTasks(filterDto, user);
}

    async getTaskbyId(id: number, user: User):Promise<Task>{
        // console.log(id);
        // console.log(user.id);

        const found = await this.TaskRepository.findOne({where: {id, userId: user.id }});
        // const found = await this.TaskRepository.createQueryBuilder('ts')
        // .where('ts.id = :id', {id})
        // .andWhere('userId = :user.id', {userId: user.id})
        // .getMany()
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

    async deleteTask(id: number, user: User): Promise<void>{
        //return this.tasks.find(tasks => tasks.id === id)
        // const found = this.getTaskbyId(id);
        // await found.TaskRepository.remove(id);
        const result = await this.TaskRepository.delete({id, userId: user.id});
        console.log(result);

        if (result.affected === 0){
            throw new NotFoundException(`Task with id:${id} not found!`);
        }
    }

    // deleteTask(id: string): void{
    //     //return this.tasks.find(tasks => tasks.id === id)
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(tasks => tasks.id !== found.id)
    // }

    async createTasks(CreateTaskDto: CreateTaskDto, user: User): Promise<Task>{
        return this.TaskRepository.createTasks(CreateTaskDto, user);
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
    
    // async updateTask(id: number, status: TasksStatus): Promise<Task>{
    //     const task = await this.getTaskbyId(id);
    //     task.status = status;
    //     await task.save();
    //     return task;
    // }

    async updateTask(id: number, status: TasksStatus, user: User){
        // const task = this.getTaskById(id, user);
        const task = await this.getTaskbyId(id, user);
        task.status = status;
        return task;
    }
}

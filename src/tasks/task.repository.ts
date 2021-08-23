import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/taskFilterDTO";
import { TasksStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto: GetTaskFilterDTO, user: User):Promise<Task[]> {
        const {status, search} = filterDto;
        const query = this.createQueryBuilder('task');
        query.where('task.userId = :userId', {userId: user.id})
           const tasks = await query.getMany();
            return tasks;
        }

    async createTasks(CreateTaskDto: CreateTaskDto, user: User): Promise<Task>{
        const {title, description} = CreateTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TasksStatus.OPEN;
        task.user = user;
        await task.save();
        delete task.user;
        return task;
    }
}
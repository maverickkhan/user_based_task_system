import { InternalServerErrorException, Logger } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTaskFilterDTO } from "./dto/taskFilterDTO";
import { TasksStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{
    private logger = new Logger('task repository')

    async getTasks(
        filterDto: GetTaskFilterDTO,
        user: User
    ): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');
        query.where('task.userId = :userId', { userId: user.id });
        if (status) {
            query.andWhere('task.status = :status', { status });
        }
        if (search) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
        }
        try {
            const tasks = await query.getMany();
            return tasks;
        } catch (error) {
            this.logger.error(`Failed to get task for user: ${user.username}, DTO: ${JSON.stringify(filterDto)}`, error.stack)
            throw new InternalServerErrorException();
        }
    }

    async createTasks(CreateTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = CreateTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TasksStatus.OPEN;
        task.user = user;

        try {
            await task.save();
        } catch (error) {
            this.logger.error(`failed to create task for user: ${user.username}, DTO: ${CreateTaskDto}`, error.stack)
            throw new InternalServerErrorException();
        }
        delete task.user;
        return task;
    }
}
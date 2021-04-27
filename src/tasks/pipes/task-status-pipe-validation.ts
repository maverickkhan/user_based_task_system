import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TasksStatus } from "../task-status.enum";
export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TasksStatus.OPEN,
        TasksStatus.IN_PROGRESS,
        TasksStatus.DONE
    ];
    transform(value: any){
        value = value.toUpperCase();
        if (!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`);
        }
        return value;
    }
    private isStatusValid(status: any){
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}
import { UseCase } from '../../../../shared/core/UseCase';
import { ITaskRepo } from '../../repos/TaskRepo/TaskRepo';
import { DeleteTaskDTO } from './DeleteTaskDTO';

type Response = void;

export class DeleteTask implements UseCase<DeleteTaskDTO, Promise<Response>> {
  private taskRepo: ITaskRepo;

  constructor(taskRepo: ITaskRepo) {
    this.taskRepo = taskRepo;
  }

  public async execute(request: DeleteTaskDTO): Promise<Response> {
    this.taskRepo.deleteTaskById(request.taskId);
    return Promise.resolve();
  }
}

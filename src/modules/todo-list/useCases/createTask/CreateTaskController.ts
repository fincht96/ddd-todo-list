import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import * as express from 'express';
import { CreateTask } from './CreateTask';
import { CreateTaskDTO } from './CreateTaskDTO';
import { toError } from '../../../../shared/core/Error';

export class CreateTaskController extends BaseController {
  private useCase: CreateTask;

  constructor(useCase: CreateTask) {
    super();

    this.useCase = useCase;
  }

  protected async executeImpl(
    req: express.Request,
    res: express.Response
  ): Promise<void | any> {
    try {
      const dto: CreateTaskDTO = {
        ...req.body
      };

      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = toError(result.value.getErrorValue());
        return this.fail(res, error.message);
      }
      return this.ok(res);
    } catch (error) {
      return this.fail(res, toError(error));
    }
  }
}

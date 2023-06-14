import { MockTaskRepo } from '../../repos/implementations/TaskRepo.mock';
import { CreateTask } from './CreateTask';
import { CreateTaskController } from './CreateTaskController';

import * as express from 'express';

describe('CreateTaskController', () => {
  let repo: MockTaskRepo = null as unknown as MockTaskRepo;
  let useCase: CreateTask = null as unknown as CreateTask;
  let request: express.Request = null as unknown as express.Request;
  const requestMockBody = {
    title: 'an example title',
    description: 'a long description',
    isCompleted: false,
    dueDateISO: new Date(Date.now() + 60 * 1000 * 3600).toISOString()
  };

  beforeEach(() => {
    repo = new MockTaskRepo([]);
    useCase = new CreateTask(repo);
    request = express.request;
    request.body = requestMockBody;
  });

  test('should create a task and return success reponse', async () => {
    const controller = new CreateTaskController(useCase);
    controller.ok = jest.fn();

    await controller.execute(request, express.response);

    const tasks = await repo.getTasks({
      offset: 0,
      limit: 10,
      taskType: 'any'
    });

    expect(controller.ok).toBeCalled();
    expect(tasks.length).toBe(1);
    expect(tasks[0].title.value).toBe(requestMockBody.title);
    expect(tasks[0].description.value).toBe(requestMockBody.description);
    expect(tasks[0].dueDate.value.toISOString()).toBe(
      requestMockBody.dueDateISO
    );
    expect(tasks[0].isCompleted.value).toBe(requestMockBody.isCompleted);
  });

  test('should not create a task and return error reponse', async () => {
    const controller = new CreateTaskController(useCase);
    const mockFail = jest.fn();
    controller.fail = mockFail;

    request.body = {
      title: 'an example title',
      description: 43
    };

    await controller.execute(request, express.response);

    const tasks = await repo.getTasks({
      offset: 0,
      limit: 10,
      taskType: 'any'
    });

    expect(mockFail).toBeCalled();
    expect(mockFail.mock.calls[0][1]).toBe(
      'Task description value must be of type string'
    );
    expect(tasks.length).toBe(0);
  });
});

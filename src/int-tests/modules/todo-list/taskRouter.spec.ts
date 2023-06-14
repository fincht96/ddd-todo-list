import request from 'supertest';

// perhaps run tests against actual database in docker
import { app } from '../../../shared/infra/http/app';

import globalSetup from '../../utils/global-setup';
import globalTeardown from '../../utils/global-teardown';

import { taskRepo } from '../../../modules/todo-list/repos';

describe('TaskRouter', () => {
  beforeAll(async () => {
    await globalSetup();
  });

  afterAll(async () => {
    await globalTeardown();
  });

  it('should create a task', async () => {
    const requestBody = {
      title: 'my first task',
      description: 'I need to do shopping',
      isCompleted: false,
      dueDateISO: new Date(Date.now() + 60 * 60 * 1000).toISOString()
    };

    const response = await request(app).post('/v1/task').send(requestBody);

    const tasks = await taskRepo.getTasks({
      offset: 0,
      limit: 10,
      taskType: 'any'
    });

    expect(response.status).toBe(200);
    expect(tasks.length).toBe(1);
    expect(tasks[0].title.value).toBe(requestBody.title);
    expect(tasks[0].description.value).toBe(requestBody.description);
    expect(tasks[0].isCompleted.value).toBe(requestBody.isCompleted);
    expect(tasks[0].dueDate.value.toISOString()).toBe(requestBody.dueDateISO);
  });

  // should get a task
  // should edit a task
  // should get completed tasks
  // should get uncompleted tasks
  // should get all tasks
});

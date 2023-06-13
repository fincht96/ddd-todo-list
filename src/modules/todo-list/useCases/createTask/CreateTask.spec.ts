import { MockTaskRepo } from '../../repos/implementations/TaskRepo.mock';
import { CreateTask } from './CreateTask';
import { CreateTaskDTO } from './CreateTaskDTO';

describe('CreateTask', () => {
  const taskRepoInstance = new MockTaskRepo([]);

  test('should create task and save to repo', async () => {
    const createTaskUseCase = new CreateTask(taskRepoInstance);
    const dueDate = new Date(Date.now() + 60 * 1000 * 60);
    const dto: CreateTaskDTO = {
      title: 'A test title',
      description: 'A test description',
      isCompleted: false,
      dueDateISO: dueDate.toISOString()
    };

    const createTaskOrErrorResult = await createTaskUseCase.execute(dto);

    expect(createTaskOrErrorResult.isRight()).toBe(true);

    const uncompletedTasks = await taskRepoInstance.getTasks({
      offset: 0,
      limit: 10,
      taskType: 'any'
    });

    expect(uncompletedTasks.length).toBe(1);
    expect(uncompletedTasks[0].title.value).toBe(dto.title);
    expect(uncompletedTasks[0].description.value).toBe(dto.description);
    expect(uncompletedTasks[0].dueDate.value.toISOString()).toBe(
      dto.dueDateISO
    );
    expect(uncompletedTasks[0].isCompleted.value).toBe(dto.isCompleted);
  });

  test('given, invalid DTO provided, should not create task and throw an error', async () => {
    const createTaskUseCase = new CreateTask(taskRepoInstance);
    const dto: CreateTaskDTO = {
      title: 'A test title',
      description: 'A test description',
      isCompleted: false,
      dueDateMs: '23/05/2024 12:15'
    } as unknown as CreateTaskDTO;

    const createTaskOrErrorResult = await createTaskUseCase.execute(dto);

    expect(createTaskOrErrorResult.isLeft()).toBe(true);
    expect(createTaskOrErrorResult.value.isFailure).toBe(true);
    expect(createTaskOrErrorResult.value.getErrorValue()).toBe(
      'Task due date value must be of type ISO 8601 string'
    );
  });
});

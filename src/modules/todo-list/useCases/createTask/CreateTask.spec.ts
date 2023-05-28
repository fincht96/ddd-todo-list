import { MockTaskRepo } from '../../repos/TaskRepo/TaskRepo.mock';
import { CreateTask } from './CreateTask';
import { CreateTaskDTO } from './CreateTaskDTO';

describe('CreateTask', () => {
  const taskRepoInstance = new MockTaskRepo([]);

  test('should create task and save to repo', async () => {
    const dueDate = new Date();

    const createTaskUseCase = new CreateTask(taskRepoInstance);
    const dto: CreateTaskDTO = {
      title: 'A test title',
      description: 'A test description',
      isCompleted: false,
      dueDate
    };

    const taskId = await createTaskUseCase.execute(dto);
    const storedTask = await taskRepoInstance.getTaskById(taskId);

    expect(storedTask.title.value).toBe('A test title');
    expect(storedTask.description.value).toBe('A test description');
    expect(storedTask.dueDate).toBe(dueDate);
    expect(storedTask.isCompleted).toBe(false);
  });
});

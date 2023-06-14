import { Task } from '../../domain/Task';
import { MockTaskRepo } from '../../repos/implementations/TaskRepo.mock';
import { TaskProps } from '../../domain/Task';
import { GetTasks } from './GetTasks';
import { TaskTitle } from '../../domain/TaskTitle';
import { TaskDescription } from '../../domain/TaskDescription';
import { TaskCompleted } from '../../domain/TaskCompleted';
import { TaskDueDate } from '../../domain/TaskDueDate';

describe('GetCompletedTasks', () => {
  let taskArray: Array<Task> = [];

  beforeEach(() => {
    const currentDateTime = new Date();
    taskArray = Array(10)
      .fill(null)
      .map((_, index) => {
        const props: TaskProps = {
          title: TaskTitle.create({ value: `Task number ${index}` }).getValue(),
          description: TaskDescription.create({
            value: `Task description ${index}`
          }).getValue(),
          isCompleted: TaskCompleted.create({
            value: index % 2 === 0 ? true : false
          }).getValue(),
          dueDate: TaskDueDate.create({
            value: new Date(
              currentDateTime.getTime() + index + 1 * 1000 * 60
            ).toISOString()
          }).getValue()
        };
        return Task.create(props).getValue();
      })
      // randomly sort the tasks based on the unique task id
      .sort(
        (a, b) => parseInt(a.taskId.charAt(6)) - parseInt(b.taskId.charAt(15))
      );
  });

  test('should get all tasks of type', async () => {
    const mockTaskRepo = new MockTaskRepo(taskArray);
    const getTasksUseCase = new GetTasks(mockTaskRepo);
    const tasksOrErrorResult = await getTasksUseCase.execute({
      offset: 1,
      limit: 3,
      taskType: 'any'
    });

    expect(tasksOrErrorResult.isRight()).toBe(true);
    expect(tasksOrErrorResult.value.isSuccess).toBe(true);
    expect(tasksOrErrorResult.value.getValue()).toEqual(taskArray.slice(1, 4));
  });

  test('should get sorted tasks', async () => {
    const tasksSortedDueDateAsc = [...taskArray]
      .filter((task) => task.isCompleted)
      .sort((a, b) => {
        return a.dueDate.value.getTime() - b.dueDate.value.getTime();
      });

    const mockTaskRepo = new MockTaskRepo(taskArray);
    const getTasksUseCase = new GetTasks(mockTaskRepo);
    const tasksOrErrorResult = await getTasksUseCase.execute({
      offset: 0,
      limit: 10,
      taskType: 'any',
      sortBy: 'dueDateAsc'
    });

    expect(tasksOrErrorResult.isRight()).toBe(true);
    expect(tasksOrErrorResult.value.isSuccess).toBe(true);
    expect(tasksOrErrorResult.value.getValue()).toEqual(tasksSortedDueDateAsc);
  });
});

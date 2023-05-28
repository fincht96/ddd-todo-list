import { Task } from '../../domain/Task';
import { MockTaskRepo } from '../../repos/TaskRepo/TaskRepo.mock';
import { TaskProps } from '../../domain/Task';
import { GetCompletedTasks } from './GetCompletedTasks';
import { TaskTitle } from '../../domain/TaskTitle';
import { TaskDescription } from '../../domain/TaskDescription';

describe('GetCompletedTasks', () => {
  let taskArray: Array<Task> = [];

  beforeEach(() => {
    const currentDateTime = new Date();
    taskArray = Array(10)
      .fill(null)
      .map((_, index) => {
        const props: TaskProps = {
          title: TaskTitle.create({ value: `Task number ${index}` }),
          description: TaskDescription.create({
            value: `Task description ${index}`
          }),
          isCompleted: index % 2 === 0 ? true : false,
          dueDate: new Date(currentDateTime.getTime() + index * 1000 * 60)
        };
        return Task.create(props);
      })
      .sort(
        (a, b) => parseInt(a.taskId.charAt(6)) - parseInt(b.taskId.charAt(15))
      );
  });

  test('should get all tasks on given offset within limit', async () => {
    const mockTaskRepo = new MockTaskRepo(taskArray);
    const getTasksUseCase = new GetCompletedTasks(mockTaskRepo);
    const results = await getTasksUseCase.execute({ offset: 1, limit: 3 });
    expect(results).toEqual(
      taskArray.filter((task) => task.isCompleted).slice(1, 4)
    );
  });

  test('should sort tasks sorted by due date descending', async () => {
    const tasksSortedDueDateDesc = [...taskArray]
      .filter((task) => task.isCompleted)
      .sort((a, b) => {
        return b.dueDate.getTime() - a.dueDate.getTime();
      });

    const mockTaskRepo = new MockTaskRepo(taskArray);
    const getTasksUseCase = new GetCompletedTasks(mockTaskRepo);
    const result = await getTasksUseCase.execute({
      offset: 0,
      limit: 10,
      sortBy: 'dueDateDesc'
    });
    expect(result).toEqual(tasksSortedDueDateDesc);
  });

  test('should sort tasks sorted by due date ascending', async () => {
    const tasksSortedDueDateAsc = [...taskArray]
      .filter((task) => task.isCompleted)
      .sort((a, b) => {
        return a.dueDate.getTime() - b.dueDate.getTime();
      });

    const mockTaskRepo = new MockTaskRepo(taskArray);
    const getTasksUseCase = new GetCompletedTasks(mockTaskRepo);
    const result = await getTasksUseCase.execute({
      offset: 0,
      limit: 10,
      sortBy: 'dueDateAsc'
    });
    expect(result).toEqual(tasksSortedDueDateAsc);
  });
});

import { toError } from '../../../../shared/core/Error';
import { Task } from '../../domain/Task';
import { TaskDescription } from '../../domain/TaskDescription';
import { TaskTitle } from '../../domain/TaskTitle';
import { MockTaskRepo } from '../../repos/TaskRepo/TaskRepo.mock';
import { DeleteTask } from './DeleteTask';
import { DeleteTaskDTO } from './DeleteTaskDTO';

describe('DeleteTask', () => {
  test('should delete existing task', async () => {
    const taskToDelete = Task.create({
      title: TaskTitle.create({ value: 'task title' }),
      description: TaskDescription.create({ value: 'task description' }),
      isCompleted: false,
      dueDate: new Date()
    });
    const taskRepo = new MockTaskRepo([taskToDelete]);
    const deleteTaskUseCase = new DeleteTask(taskRepo);

    const deleteTaskDTO: DeleteTaskDTO = {
      taskId: taskToDelete.taskId
    };

    const originalTask = await taskRepo.getTaskById(taskToDelete.taskId);

    expect(originalTask.title).toBe(taskToDelete.title);
    expect(originalTask.description).toBe(taskToDelete.description);
    expect(originalTask.dueDate).toBe(taskToDelete.dueDate);
    expect(originalTask.isCompleted).toBe(taskToDelete.isCompleted);
    await deleteTaskUseCase.execute(deleteTaskDTO);

    try {
      await taskRepo.getTaskById(taskToDelete.taskId);
    } catch (error: unknown) {
      expect(toError(error).message).toBe(
        `Unable to find a task with id ${taskToDelete.taskId}`
      );
    }
  });

  test('should not delete, as task does not exist', async () => {
    const taskToDelete = Task.create({
      title: TaskTitle.create({ value: 'task title' }),
      description: TaskDescription.create({ value: 'task description' }),
      isCompleted: false,
      dueDate: new Date()
    });
    const taskRepo = new MockTaskRepo([taskToDelete]);
    const deleteTaskUseCase = new DeleteTask(taskRepo);

    const deleteTaskDTO: DeleteTaskDTO = {
      taskId: taskToDelete.taskId
    };

    const originalTask = await taskRepo.getTaskById(taskToDelete.taskId);

    expect(originalTask.title).toBe(taskToDelete.title);
    expect(originalTask.description).toBe(taskToDelete.description);
    expect(originalTask.dueDate).toBe(taskToDelete.dueDate);
    expect(originalTask.isCompleted).toBe(taskToDelete.isCompleted);
    await deleteTaskUseCase.execute(deleteTaskDTO);

    try {
      await taskRepo.getTaskById(taskToDelete.taskId);
    } catch (error: unknown) {
      expect(toError(error).message).toBe(
        `Unable to find a task with id ${taskToDelete.taskId}`
      );
    }
  });
});

import { toError } from '../../../../shared/core/Error';
import { Task } from '../../domain/Task';
import { TaskCompleted } from '../../domain/TaskCompleted';
import { TaskDescription } from '../../domain/TaskDescription';
import { TaskDueDate } from '../../domain/TaskDueDate';
import { TaskTitle } from '../../domain/TaskTitle';
import { MockTaskRepo } from '../../repos/implementations/TaskRepo.mock';
import { DeleteTask } from './DeleteTask';
import { DeleteTaskDTO } from './DeleteTaskDTO';

describe('DeleteTask', () => {
  test('should delete existing task', async () => {
    const firstDate = new Date(Date.now() + 60 * 1000);

    const taskToDeleteOrErrorResult = Task.create({
      title: TaskTitle.create({ value: 'Example title' }).getValue(),
      description: TaskDescription.create({
        value: 'This is an example description'
      }).getValue(),
      dueDate: TaskDueDate.create({
        value: firstDate.toISOString()
      }).getValue(),
      isCompleted: TaskCompleted.create({ value: false }).getValue()
    });

    const taskRepo = new MockTaskRepo([taskToDeleteOrErrorResult.getValue()]);
    const deleteTaskUseCase = new DeleteTask(taskRepo);

    const deleteTaskDTO: DeleteTaskDTO = {
      taskId: taskToDeleteOrErrorResult.getValue().taskId
    };

    const response = await deleteTaskUseCase.execute(deleteTaskDTO);
    expect(response.isRight()).toBe(true);

    try {
      await taskRepo.getTaskById(taskToDeleteOrErrorResult.getValue().taskId);
    } catch (error: unknown) {
      expect(toError(error).message).toBe(
        `Unable to find a task with id ${
          taskToDeleteOrErrorResult.getValue().taskId
        }`
      );
    }
  });

  test('should not delete, as task does not exist', async () => {
    const firstDate = new Date(Date.now() + 60 * 1000);

    const taskToDeleteOrErrorResult = Task.create({
      title: TaskTitle.create({ value: 'Example title' }).getValue(),
      description: TaskDescription.create({
        value: 'This is an example description'
      }).getValue(),
      dueDate: TaskDueDate.create({
        value: firstDate.toISOString()
      }).getValue(),
      isCompleted: TaskCompleted.create({ value: false }).getValue()
    });

    const taskRepo = new MockTaskRepo([taskToDeleteOrErrorResult.getValue()]);
    const deleteTaskUseCase = new DeleteTask(taskRepo);

    const deleteTaskDTO: DeleteTaskDTO = {
      taskId: 'some-random-id'
    };

    const response = await deleteTaskUseCase.execute(deleteTaskDTO);
    const tasks = await taskRepo.getTasks({
      offset: 0,
      limit: 10,
      taskType: 'any'
    });
    expect(response.isLeft()).toBe(true);
    expect(response.value.getErrorValue()).toBe(
      'Unable to find a task with id some-random-id'
    );
    expect(tasks.length).toBe(1);
  });
});

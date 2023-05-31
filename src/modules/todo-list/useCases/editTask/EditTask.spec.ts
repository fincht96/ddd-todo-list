import { Task, TaskProps } from '../../domain/Task';
import { TaskCompleted } from '../../domain/TaskCompleted';
import { TaskDescription } from '../../domain/TaskDescription';
import { TaskDueDate } from '../../domain/TaskDueDate';
import { TaskTitle } from '../../domain/TaskTitle';
import { MockTaskRepo } from '../../repos/TaskRepo/TaskRepo.mock';
import { EditTask } from './EditTask';
import { EditTaskDTO } from './EditTaskDTO';

describe('EditTask', () => {
  const completedDate = new Date();

  const dueDate = new Date(Date.now() + 60 * 1000 * 60);

  const taskToEditOrErrorResult = Task.create({
    title: TaskTitle.create({ value: 'Example title' }).getValue(),
    description: TaskDescription.create({
      value: 'This is an example description'
    }).getValue(),
    dueDate: TaskDueDate.create({ value: dueDate.getTime() }).getValue(),
    isCompleted: TaskCompleted.create({ value: false }).getValue()
  });

  const taskToEdit = taskToEditOrErrorResult.getValue();

  test('should edit an existing task', async () => {
    const taskRepoInstance = new MockTaskRepo([taskToEdit]);
    const editTaskUseCase = new EditTask(taskRepoInstance);
    const editTaskDTO: EditTaskDTO = {
      title: 'new title',
      description: 'new description',
      isCompleted: true,
      dueDateMs: new Date(completedDate.getTime() + 60).getTime(),
      taskId: taskToEdit.taskId
    };

    const response = await editTaskUseCase.execute(editTaskDTO);
    expect(response.isRight()).toBe(true);

    const updatedTask = await taskRepoInstance.getTaskById(taskToEdit.taskId);

    expect(updatedTask.title.value).toBe(editTaskDTO.title);
    expect(updatedTask.description.value).toBe(editTaskDTO.description);
    expect(updatedTask.dueDate.value.getTime()).toBe(editTaskDTO.dueDateMs);
    expect(updatedTask.isCompleted.value).toBe(editTaskDTO.isCompleted);
  });

  test(`should throw an error, task to edit doesn't exist`, async () => {
    const taskRepoInstance = new MockTaskRepo([]);
    const editTaskUseCase = new EditTask(taskRepoInstance);
    const editTaskDTO: EditTaskDTO = {
      title: 'new title',
      description: 'new description',
      isCompleted: true,
      dueDateMs: new Date(completedDate.getTime() + 60).getTime(),
      taskId: taskToEdit.taskId
    };

    const response = await editTaskUseCase.execute(editTaskDTO);
    expect(response.isLeft()).toBe(true);

    expect(response.value.getErrorValue()).toBe(
      `Unable to find a task with id ${taskToEdit.taskId}`
    );
  });

  test(`should throw an error, task to edit doesn't exist`, async () => {
    const taskRepoInstance = new MockTaskRepo([]);
    const editTaskUseCase = new EditTask(taskRepoInstance);
    const editTaskDTO: EditTaskDTO = {
      title: 'new title',
      description: 'new description',
      isCompleted: true,
      dueDateMs: new Date(completedDate.getTime() + 60).getTime(),
      taskId: taskToEdit.taskId
    };

    const response = await editTaskUseCase.execute(editTaskDTO);
    expect(response.isLeft()).toBe(true);

    expect(response.value.getErrorValue()).toBe(
      `Unable to find a task with id ${taskToEdit.taskId}`
    );
  });
});

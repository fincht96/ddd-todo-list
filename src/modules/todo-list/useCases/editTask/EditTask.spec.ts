import { Task } from '../../domain/Task';
import { TaskDescription } from '../../domain/TaskDescription';
import { TaskTitle } from '../../domain/TaskTitle';
import { MockTaskRepo } from '../../repos/TaskRepo/TaskRepo.mock';
import { EditTask } from './EditTask';
import { EditTaskDTO } from './EditTaskDto';

describe('EditTask', () => {
  const completedDate = new Date();
  const taskToEdit = Task.create({
    title: TaskTitle.create({ value: 'task title' }),
    description: TaskDescription.create({ value: 'task description' }),
    isCompleted: false,
    dueDate: completedDate
  });

  test('should edit an existing task', async () => {
    const taskRepoInstance = new MockTaskRepo([taskToEdit]);
    const editTaskUseCase = new EditTask(taskRepoInstance);
    const editTaskDTO: EditTaskDTO = {
      title: 'new title',
      description: 'new description',
      isCompleted: true,
      dueDate: new Date(completedDate.getTime() + 60),
      taskId: taskToEdit.taskId
    };

    const originalTask = await taskRepoInstance.getTaskById(taskToEdit.taskId);

    expect(originalTask.title).toBe(taskToEdit.title);
    expect(originalTask.description).toBe(taskToEdit.description);
    expect(originalTask.dueDate).toBe(taskToEdit.dueDate);
    expect(originalTask.isCompleted).toBe(taskToEdit.isCompleted);

    await editTaskUseCase.execute(editTaskDTO);

    const updatedTask = await taskRepoInstance.getTaskById(taskToEdit.taskId);

    expect(updatedTask.title.value).toBe(editTaskDTO.title);
    expect(updatedTask.description.value).toBe(editTaskDTO.description);
    expect(updatedTask.dueDate).toBe(editTaskDTO.dueDate);
    expect(updatedTask.isCompleted).toBe(editTaskDTO.isCompleted);
  });

  test(`should throw an error, task to edit doesn't exist`, async () => {
    const taskRepoInstance = new MockTaskRepo([]);
    const editTaskUseCase = new EditTask(taskRepoInstance);
    const editTaskDTO: EditTaskDTO = {
      title: 'new title',
      description: 'new description',
      isCompleted: true,
      dueDate: new Date(completedDate.getTime() + 60),
      taskId: taskToEdit.taskId
    };

    await expect(editTaskUseCase.execute(editTaskDTO)).rejects.toThrow(
      `Unable to find a task with id ${taskToEdit.taskId}`
    );
  });
});

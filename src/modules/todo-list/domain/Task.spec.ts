import { Task, TaskProps } from './Task';
import { TaskTitle } from './TaskTitle';
import { TaskDescription } from './TaskDescription';

describe('Task', () => {
  const currentDate = new Date();
  const newDate = new Date(currentDate.getTime() + 60);

  const oldProps: TaskProps = {
    title: TaskTitle.create({ value: 'Example title' }),
    description: TaskDescription.create({
      value: 'This is an example description'
    }),
    dueDate: currentDate,
    isCompleted: false
  };

  const newProps: TaskProps = {
    title: TaskTitle.create({ value: 'Another Example title' }),
    description: TaskDescription.create({
      value: 'This is another example description'
    }),
    dueDate: newDate,
    isCompleted: true
  };

  test('should create task', () => {
    const task = Task.create(oldProps);
    expect(task.title.value).toEqual('Example title');
    expect(task.description.value).toEqual('This is an example description');
    expect(task.dueDate).toEqual(currentDate);
    expect(task.isCompleted).toEqual(false);
  });

  test('should update task', () => {
    const task = Task.create(oldProps);
    task.updateTaskProps(newProps);
    expect(task.title.value).toEqual('Another Example title');
    expect(task.description.value).toEqual(
      'This is another example description'
    );
    expect(task.dueDate).toEqual(newDate);
    expect(task.isCompleted).toEqual(true);
  });

  // should not create a new task with same uid as one already exists
});

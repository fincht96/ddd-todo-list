export interface EditTaskDTO {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDateMs: number;
  taskId: string;
}

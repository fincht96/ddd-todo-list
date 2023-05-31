export interface CreateTaskDTO {
  title: string;
  description: string;
  isCompleted: boolean;
  dueDateMs: number;
}

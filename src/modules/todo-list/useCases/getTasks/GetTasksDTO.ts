export interface GetTasksDTO {
  offset: number;
  limit: number;
  taskType: 'completed' | 'uncompleted' | 'any';
  sortBy?: 'dueDateDesc' | 'dueDateAsc';
}

export interface GetCompletedTasksDTO {
  offset: number;
  limit: number;
  sortBy?: 'dueDateDesc' | 'dueDateAsc';
}

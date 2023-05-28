export interface GetUncompletedTasksDTO {
  offset: number;
  limit: number;
  sortBy?: 'dueDateDesc' | 'dueDateAsc';
}

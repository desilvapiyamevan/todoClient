export interface TodoItem extends ToDoCreateRequest {
  toDoItemId: number;
  isCompleted: boolean;
  createdDate: string;
}

export interface ToDoCreateRequest {
  title: string;
  description: string;
}



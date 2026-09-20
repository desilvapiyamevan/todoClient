export interface TodoItem {
  toDoItemId: number;
  isCompleted: boolean;
  createdDate: string;
  title: string;
  description: string;
}

export interface ToDoCreateRequest {
  title: string;
  description: string;
}



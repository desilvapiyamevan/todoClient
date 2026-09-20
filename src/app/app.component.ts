import { Component, OnInit, signal } from '@angular/core';
import { TodoService } from './services/todo.service';
import { TodoItem } from './models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent implements OnInit {

  readonly todos = signal<TodoItem[]>([]);
  readonly toDoTitle = signal('');
  readonly toDoDescription = signal('');
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading.set(true);
    this.error.set(null);
    this.todoService.getTodos()
      .subscribe({
        next: (todos) => {
          this.todos.set(todos);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Could not load your to-do list. Is the API running?');
          this.loading.set(false);
        },
      })
  }

  addTodo(): void {

    if (!this.toDoTitle().trim()) {
      return;
    }

    this.todoService
      .addTodo(this.toDoTitle(), this.toDoDescription())
      .subscribe({
        next: (created) => {
          this.loadTodos();
          this.toDoTitle.set('');
          this.toDoDescription.set('');
        },
        error: () => this.error.set('Could not add that item. Please try again.'),
      });
  }

  deleteTodo(id: number): void {
    this.todoService
      .deleteTodo(id)
      .subscribe(() => this.loadTodos());
  }

  truncate(text: string, limit: number = 50): string {
    if (!text) return '';
    return text.length > limit ? text.slice(0, limit) + '...' : text;
  }
}
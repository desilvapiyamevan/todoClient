import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoCreateRequest, TodoItem } from '../models/todo.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = `${environment.apiUrl}/todos`;
  constructor(private http: HttpClient) { }
  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
  }

  getTodoById(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`this.apiUrl/${id}`);
  }
  addTodo(title: string, description: string): Observable<ToDoCreateRequest> {
    return this.http.post<ToDoCreateRequest>(this.apiUrl, {
      title,
      description
    });
  }

  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
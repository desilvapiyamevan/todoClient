import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoCreateRequest, TodoItem } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl = 'http://localhost:5257/api/todos';

  constructor(private http: HttpClient) { }


  getTodos(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.apiUrl);
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
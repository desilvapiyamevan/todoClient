import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { TodoService } from './todo.service';
import { TodoItem, ToDoCreateRequest } from '../models/todo.model';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:5257/api/todos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should GET todos from the API', () => {

      const mockTodos: TodoItem[] = [
        { toDoItemId: 1, title: 'My Birth Day', description: 'Party On Sunday', isCompleted: false, createdDate: new Date().toISOString() },
      ];
      service.getTodos().subscribe(todos => {
        expect(todos).toEqual(mockTodos);
        expect(todos.length).toBe(1);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockTodos);
    });

    it('should propagate an error response', () => {
      service.getTodos().subscribe({
        next: () => fail('expected an error, not todos'),
        error: (err) => expect(err.status).toBe(500)
      });

      const req = httpMock.expectOne(apiUrl);
      req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('addTodo', () => {
    it('should POST a new todo with title and description', () => {
      const mockResponse: ToDoCreateRequest = {
        title: 'New task',
        description: 'Task details'
      } as ToDoCreateRequest;

      service.addTodo('New task', 'Task details').subscribe(result => {
        expect(result).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        title: 'New task',
        description: 'Task details'
      });
      req.flush(mockResponse);
    });
  });

  it('should DELETE a todo by id', () => {
    const id = 42;

    service.deleteTodo(id).subscribe(result => {
      expect(result).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
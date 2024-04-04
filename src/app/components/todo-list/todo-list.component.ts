import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router) {}

  todos$!: Observable<any[]>; // Observable to hold the todo list

  ngOnInit(): void {
    this.todos$ = this.fetchTodoList(); // Fetch todo list on component initialization
  }

  fetchTodoList(): Observable<any[]> {
    return this.httpClient
      .get<any[]>('https://boyumcodechallenge.azurewebsites.net/api/todolist')
      .pipe(
        map(todoList => {
          // Convert 'Created' timestamps to Date objects
          todoList.forEach(todo => {
            if (typeof todo.Created === 'number') {
              todo.Created = new Date(todo.Created);
            }
          });
          return todoList;
        })
      );
  }

  // Navigate to todo details page
  navigateToTodoDetails(todoId: number): void {
    this.router.navigate(['/todo', todoId]);
  }

  // Navigate to create new todo page
  navigateToTodoNew(): void {
    this.router.navigate(['/todo/new']);
  }

  // Check if a value is a valid Date object
  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
}

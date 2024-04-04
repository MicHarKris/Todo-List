import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  todo$: Observable<any> = new Observable<any>(); // Observable to hold the todo item

  ngOnInit(): void {
    // Fetch todo details based on route parameter
    this.todo$ = this.route.paramMap.pipe(
      map(paramMap => paramMap.get('id')), // Extract todo ID from route parameter
      switchMap(todoId => {
        if (todoId) {
          // Convert todo ID to number and fetch todo detail
          return this.fetchTodoDetail(+todoId);
        } else {
          // If todo ID is not provided, return an empty observable
          return new Observable<any>();
        }
      })
    );
  }

  // Fetch todo detail by ID
  fetchTodoDetail(id: number): Observable<any> {
    return this.httpClient
      .get<any[]>('https://boyumcodechallenge.azurewebsites.net/api/todolist')
      .pipe(
        map(todoList => {
          // Find the todo item with matching ID
          const todo = todoList.find(todo => todo.Id === id);
          // Convert 'Created' timestamp to Date object if exists
          if (todo && typeof todo.Created === 'number') {
            todo.Created = new Date(todo.Created);
          }
          return todo;
        })
      );
  }

  // Check if the input is a valid Date object
  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  // Calculate the age of the todo item in days
  getDaysOld(createdDate: Date): number {
    const today = new Date();
    const difference = today.getTime() - createdDate.getTime();
    return Math.floor(difference / (1000 * 60 * 60 * 24));
  }

  // Navigate back to the todo list
  navigateToTodoList(): void {
    this.router.navigate(['/todos']);
  }
}

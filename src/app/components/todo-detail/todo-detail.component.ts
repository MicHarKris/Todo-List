import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {
  todo: any; // Variable to hold the todo item

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes to fetch todo details
    this.route.paramMap.subscribe((paramMap) => {
      const todoId = paramMap.get('id'); // Get todo ID from route parameter
      if (todoId) {
        this.fetchTodoDetail(+todoId); // Convert todo ID to number and fetch todo detail
      }
    });
  }

  // Fetch todo detail by ID
  fetchTodoDetail(id: number): void {
    this.httpClient
      .get<any[]>('https://boyumcodechallenge.azurewebsites.net/api/todolist')
      .subscribe((todoList) => {
        // Find the todo item with matching ID
        this.todo = todoList.find((todo) => todo.Id === id);
        // Convert 'Created' timestamp to Date object if exists
        if (this.todo && typeof this.todo.Created === 'number') {
          this.todo.Created = new Date(this.todo.Created);
        }
      });
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

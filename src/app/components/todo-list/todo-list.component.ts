import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-todo-list',
  standalone: true, // Standalone mode
  imports: [CommonModule, HttpClientModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router) {} // Inject Router

  todos: any[] = []; // Array to store todos

  ngOnInit(): void {
    this.fetchTodoList(); // Fetch todo list on component initialization
  }

  fetchTodoList() {
    // Fetch todo list from API
    this.httpClient
      .get('https://boyumcodechallenge.azurewebsites.net/api/todolist')
      .subscribe((todoList) => {
        // Store fetched todo list
        this.todos = todoList as any[];

        // Convert 'Created' timestamps to Date objects
        this.todos.forEach((todo) => {
          if (typeof todo.Created === 'number') {
            todo.Created = new Date(todo.Created);
          }
        });
      });
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

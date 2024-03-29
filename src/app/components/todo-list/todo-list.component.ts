import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router) {} // Inject Router

  todos: any[] = [];

  ngOnInit(): void {
    this.fetchTodoList();
  }

  fetchTodoList() {
    this.httpClient.get('https://boyumcodechallenge.azurewebsites.net/api/todolist')
      .subscribe(todoList => {
        this.todos = todoList as any[];
        // Convert 'Created' timestamps to Date objects
        this.todos.forEach(todo => {
          if (typeof todo.Created === 'number') {
            todo.Created = new Date(todo.Created);
          }
        });
      });
  }

  navigateToTodoDetails(todoId: number): void {
    this.router.navigate(['/todo', todoId]);
  }

  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }
  
}

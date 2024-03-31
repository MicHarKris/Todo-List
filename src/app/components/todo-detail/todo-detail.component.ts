import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})

export class TodoDetailComponent implements OnInit {
  todo: any;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const todoId = paramMap.get('id');
      if (todoId) {
        this.fetchTodoDetail(+todoId);
      }
    });
  }

  fetchTodoDetail(id: number): void {
    this.httpClient.get<any[]>('https://boyumcodechallenge.azurewebsites.net/api/todolist')
      .subscribe(todoList => {
        this.todo = todoList.find(todo => todo.Id === id);
        if (this.todo && typeof this.todo.Created === 'number') {
          this.todo.Created = new Date(this.todo.Created);

        }
      });
  }

  isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  getDaysOld(createdDate: Date): number {
    const today = new Date();
    const difference = today.getTime() - createdDate.getTime();
    return Math.floor(difference / (1000 * 60 * 60 * 24));
  }

  navigateToTodoList(): void {
    this.router.navigate(['/todos']);
  }
}

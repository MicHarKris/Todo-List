import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  httpClient = inject(HttpClient);
  todos: any[] = [];

  ngOnInit(): void {
    this.fetchTodoList();
  }

  fetchTodoList(){
    this.httpClient.get('https://boyumcodechallenge.azurewebsites.net/api/todolist')
      .subscribe(todoList => {
        console.log(todoList);
        this.todos = todoList as any[];
      });
  }
}

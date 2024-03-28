import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // TodoListComponent,
    TodoDetailComponent,
    // RouterOutlet, 
    RouterModule
  ],
  template: `
      <router-outlet></router-outlet>
`,
  // templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Todo List';
}

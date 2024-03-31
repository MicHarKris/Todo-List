import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TodoDetailComponent,
    RouterModule
  ],
  template: `
      <router-outlet></router-outlet>
`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Todo List';
}

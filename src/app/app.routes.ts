
import { Routes } from '@angular/router';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

const routeConfig: Routes = [
    {
      path: '',
      redirectTo: '/todos',
      pathMatch: 'full'
    },
    {
      path: 'todos',
      component: TodoListComponent,
      title: 'Todo List'
    },
    {
      path: 'todo/:id',
      component: TodoDetailComponent,
      title: 'Todo Detail'
    }
  ];
  
  export default routeConfig;
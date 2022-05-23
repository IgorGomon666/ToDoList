import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateToDoPageComponent } from './create-to-do-page/create-to-do-page.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', redirectTo: '/createtodo', pathMatch: 'full'},
  {path: 'createtodo', component: CreateToDoPageComponent},
  {path: 'todo', component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

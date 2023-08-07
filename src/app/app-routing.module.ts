import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from "./app.component";

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/docusignapiauth',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: AppComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
})

export class AppRoutingModule { }

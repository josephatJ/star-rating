import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {AuthenticatedComponent} from "./authenticated/authenticated.component";

const routes: Routes = [
  { path: '', component: HomeComponent , pathMatch: 'full' },
  {path: 'authenticate', component: AuthenticatedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

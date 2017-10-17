import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontPageComponent } from '../front-page/front-page.component';
import { GuardianComponent } from '../guardian/guardian.component';
import { SearchComponent } from '../search/search.component';

const appRoutes: Routes = [
  { path: 'search/:guardian', component: SearchComponent },
  { path: 'guardian/:membershipType/:membershipId', component: GuardianComponent },
  { path: '', component: FrontPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutesModule { }

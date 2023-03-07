import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FrontPageComponent } from '../front-page/front-page.component'

const appRoutes: Routes = [
  { path: '', component: FrontPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {})],
  exports: [RouterModule],
})
export class RoutesModule {}

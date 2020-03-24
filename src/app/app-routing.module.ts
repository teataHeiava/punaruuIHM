import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SectionComponent} from './component/section/section.component';
import {AuthGard} from './services/guard/auth-gard';

const appRoutes: Routes = [
  {
    path: 'section/:discipline',
    component: SectionComponent,
    canActivate: [AuthGard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cruve3dComponent } from './cruve3d/cruve3d.component';
import { SimpleSceneComponent } from './simple-scene/simple-scene.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'simple',
    pathMatch: 'full',
  },
  {
    path: 'simple',
    component: SimpleSceneComponent,
  },
  {
    path: 'cruve3d',
    component: Cruve3dComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { Routes } from '@angular/router';
import { EvaluationComponent } from './evaluation.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationComponent,
    title: 'EllaCrédito',
    children: [
      {
        path: 'form',
        loadComponent: () => 
          import('./pages/evaluation-form/evaluation-form.component')
          .then(m => m.EvaluationFormComponent)
      }
      // {
      //   path: 'form',
      //   loadChildren: () =>
      //     import('./pages/evaluation-form/evaluation-form.routes'),
      // },
    ],
  },
];

export default routes;

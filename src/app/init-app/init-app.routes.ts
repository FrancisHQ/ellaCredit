import { Routes } from '@angular/router';
import { InitAppComponent } from './init-app.component';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { EvaluationFormComponent } from '../evaluation/pages/evaluation-form/evaluation-form.component';

const routes: Routes = [
  {
    path: '',
    component: InitAppComponent,
    title: 'Banco de Crédito del Perú | Vía BCP',
  },
  {
    path: 'evaluation',
    loadComponent: () =>
      import(
        '../evaluation/pages/evaluation-form/evaluation-form.component'
      ).then((m) => m.EvaluationFormComponent),
    title: 'Ella Crédito - Formulario',
  },
];

export default routes;

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
		path: '',
		loadChildren: () => import('./init-app/init-app.routes')
	},
];

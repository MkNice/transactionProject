import { Routes } from '@angular/router';
import { BalanceComponent } from './dashboard/balance/balance.component';

export const routes: Routes = [
  {
    path: '**',
    redirectTo: 'balance',
  },
  {
    path: 'balance',
    component: BalanceComponent,
  },
];

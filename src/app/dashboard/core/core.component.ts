import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITransactions } from '../../shared/interfaces/transactions';
import { TransactionButtonComponent } from '../transaction-button/transaction-button.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { BalanceComponent } from '../balance/balance.component';

@Component({
  selector: 'app-core',
  imports: [BalanceComponent,TransactionButtonComponent, TransactionListComponent],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreComponent {
  public dataDialog!: ITransactions;
}

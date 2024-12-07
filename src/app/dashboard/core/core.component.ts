import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ITransactions } from '../../shared/interfaces/transactions';
import { TransactionButtonComponent } from '../transaction-button/transaction-button.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { BalanceComponent } from '../balance/balance.component';

@Component({
  selector: 'app-core',
  imports: [
    BalanceComponent,
    TransactionButtonComponent,
    TransactionListComponent,
  ],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoreComponent implements OnInit, OnDestroy {
  public transactions: ITransactions[] = [
    {
      name: 'Я не ебу',
      amount: 5000,
      category: 'Groceries',
      type: 'Income',
      date: new Date('2023-12-01'),
    },
    {
      name: 'И тебя не ебу',
      amount: 150,
      category: 'Entertainment',
      type: 'Income',
      date: new Date('2023-12-02'),
    },
    {
      name: 'Срань',
      amount: 200,
      category: 'Other',
      type: 'Expense',
      date: new Date('2023-12-03'),
    },
    {
      name: 'Господня',
      amount: 1200,
      category: 'Utilities',
      type: 'Expense',
      date: new Date('2023-12-04'),
    },
  ];
  public dataDialog!: ITransactions;
  public totalMoney: number = 0;

  public ngOnInit(): void {
    this.totalMoney = this.countTotalMoney();
  }
  public ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  public countTotalMoney(): number {
    return this.transactions.reduce(
      (acc, { amount, type }) =>
        (acc += type === 'Income' ? amount : -amount),
      0
    );
  }
  public getDataDialog(dataFromDialog: ITransactions): void {
    if (!dataFromDialog) {
      return;
    }

    this.transactions = [dataFromDialog, ...this.transactions];
    this.totalMoney = this.countTotalMoney();
  }
}

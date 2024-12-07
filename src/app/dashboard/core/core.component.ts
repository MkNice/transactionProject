import { ChangeDetectionStrategy, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
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
export class CoreComponent implements OnInit,  OnDestroy {
  public transactions: ITransactions[] = [
    {
      name: 'Salary',
      amount: 5000,
      category: 'Income',
      date: new Date('2023-12-01'),
    },
    {
      name: 'Groceries',
      amount: -150,
      category: 'Expense',
      date: new Date('2023-12-02'),
    },
    {
      name: 'Utilities',
      amount: -200,
      category: 'Expense',
      date: new Date('2023-12-03'),
    },
    {
      name: 'Freelance',
      amount: 1200,
      category: 'Income',
      date: new Date('2023-12-04'),
    },
  ];
  public dataDialog!: ITransactions;
  public totalMoney: number = 0;

  constructor(){}

  public getDataDialog(dataFromDialog:ITransactions):void{
    this.transactions = [dataFromDialog, ...this.transactions];
  }

  public ngOnInit(): void {
    this.transactions.forEach(transaction => transaction.category === 'income')
  }
  public ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
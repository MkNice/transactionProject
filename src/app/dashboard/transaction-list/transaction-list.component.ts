import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ITransactions } from '../../shared/interfaces/transactions';

@Component({
  selector: 'app-transaction-list',
  imports: [MatTableModule, CurrencyPipe, DatePipe],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionListComponent implements OnChanges {
  @Input() public dataFromDialog!: ITransactions;

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

  public displayedColumns: string[] = ['name', 'amount', 'category', 'date'];

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataFromDialog'].isFirstChange()) {
      return;
    }
    this.transactions = [this.dataFromDialog, ...this.transactions];
  }
}

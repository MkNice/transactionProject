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
import { SelectComponent } from '../../shared/components/select/select.component';
import { categories, TYPES } from '../../shared/constants';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-core',
  imports: [
    BalanceComponent,
    TransactionButtonComponent,
    TransactionListComponent,
    FiltersComponent,
  ],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CoreComponent implements OnInit {
  public transactions: ITransactions[] = [
    { name: 'Я не ебу', amount: 5000, category: 'Groceries', type: 'Income', date: new Date('2023-12-01') },
    { name: 'И тебя не ебу', amount: 150, category: 'Entertainment', type: 'Income', date: new Date('2023-12-02') },
    { name: 'Срань', amount: 200, category: 'Other', type: 'Expense', date: new Date('2023-12-03') },
    { name: 'Господня', amount: 1200, category: 'Utilities', type: 'Expense', date: new Date('2023-12-04') },
  ];

  public filters: Map<string, string> = new Map([
    ['category', 'All'],
    ['type', 'All'],
  ]);

  public filteredTransactions: ITransactions[] = [];
  public totalMoney: number = 0;

  ngOnInit(): void {
    this.updateState();
    this.totalMoney = this.calculateTotal();
  }

  private updateState(): void {
    this.filteredTransactions = this.applyFilters();
  }

  private applyFilters(): ITransactions[] {
    return this.transactions.filter((transaction) => {
      for (const [key, value] of this.filters) {
        if (value !== 'All' && transaction[key as keyof ITransactions] !== value) {
          return false;
        }
      }
      return true;
    });
  }

  private calculateTotal(): number {
    return this.filteredTransactions.reduce(
      (acc, { amount, type }) => acc + (type === 'Income' ? amount : -amount),
      0
    );
  }

  public addTransaction(newTransaction: ITransactions): void {
    if (!newTransaction) return;

    this.transactions = [newTransaction, ...this.transactions];
    this.totalMoney = this.calculateTotal();
    this.updateState();
  }

  public updateFilters(filters: Map<string, string>): void {
    this.filters = filters;
    this.updateState();
  }
}
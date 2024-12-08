import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ITransactions } from '../../shared/interfaces/transactions';
import { TransactionButtonComponent } from '../transaction-button/transaction-button.component';
import { TransactionListComponent } from '../transaction-list/transaction-list.component';
import { BalanceComponent } from '../balance/balance.component';
import { FiltersComponent } from '../filters/filters.component';
import { TransactionService } from '../../shared/services/transaction-storage.service';

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
  private transactionService = inject(TransactionService);

  public transactions: ITransactions[] = [];
  public filters: Map<string, string> = new Map<string, string>();
  public filteredTransactions: ITransactions[] = [];
  public totalMoney: number = 0;


  public ngOnInit(): void {
    this.loadState();
    this.updateState();
    this.totalMoney = this.calculateTotal();
  }

  private loadState(): void {
    this.transactions = this.transactionService.getTransactions();
    this.filters = this.transactionService.getFilters();
  }

  private saveState(): void {
    this.transactionService.saveTransactions(this.transactions);
    this.transactionService.saveFilters(this.filters);
  }

  private updateState(): void {
    this.filteredTransactions = this.applyFilters();
    this.saveState();
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
    this.updateState();
    this.totalMoney = this.calculateTotal();
  }

  public updateFilters(filters: Map<string, string>): void {
    this.filters = filters;
    this.updateState();
  }
}
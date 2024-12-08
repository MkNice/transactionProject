import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ITransactions } from '../interfaces/transactions';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private localStorageService = inject(LocalStorageService);

  private readonly TRANSACTIONS_KEY = 'transactions';
  private readonly FILTERS_KEY = 'filters';

  public getTransactions(): ITransactions[] {
    const transactions =
      this.localStorageService.getItem(this.TRANSACTIONS_KEY) ?? '[]';
    return JSON.parse(transactions);
  }

  public saveTransactions(transactions: ITransactions[]): void {
    const transactionsStringified = JSON.stringify(transactions);
    this.localStorageService.setItem(
      this.TRANSACTIONS_KEY,
      transactionsStringified
    );
  }

  public getFilters(): Map<string, string> {
    const savedFilters = JSON.parse(
      this.localStorageService.getItem(this.FILTERS_KEY) ?? '[]'
    );
    return savedFilters
      ? new Map(savedFilters)
      : new Map([
          ['category', 'All'],
          ['type', 'All'],
        ]);
  }

  public saveFilters(filters: Map<string, string>): void {
    this.localStorageService.setItem(
      this.FILTERS_KEY,
      JSON.stringify(Array.from(filters.entries()))
    );
  }
}

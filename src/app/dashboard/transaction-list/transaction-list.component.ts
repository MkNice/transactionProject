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
export class TransactionListComponent{
  @Input() public transactions: ITransactions[] = []

  public displayedColumns: string[] = ['name', 'amount', 'category', 'date'];
}

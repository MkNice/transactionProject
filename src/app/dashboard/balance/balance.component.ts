import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { TransactionButtonComponent } from '../transaction-button/transaction-button.component';

@Component({
  selector: 'app-balance',
  imports: [TransactionButtonComponent],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss'
})
export class BalanceComponent {
  public currentBalance: number = 0;

}

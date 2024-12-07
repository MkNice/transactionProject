import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-balance',
  imports: [],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class BalanceComponent {
  public currentBalance: number = 0;
 
}

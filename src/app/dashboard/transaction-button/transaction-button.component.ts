import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-transaction-button',
  imports: [MatButtonModule],
  templateUrl: './transaction-button.component.html',
  styleUrl: './transaction-button.component.scss',
})
export class TransactionButtonComponent {
  public openModal():void{
    
  }
}

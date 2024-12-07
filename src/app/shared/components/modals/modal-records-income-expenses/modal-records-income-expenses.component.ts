import { DialogRef } from '@angular/cdk/dialog';
import { NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ITransactions } from '../../../interfaces/transactions';

@Component({
  selector: 'app-modal-records-income-expenses',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './modal-records-income-expenses.component.html',
  styleUrl: './modal-records-income-expenses.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class ModalRecordsIncomeExpensesComponent {
  private dialogRef = inject(DialogRef);
  private fb = inject(FormBuilder);

  public transactionForm: FormGroup;
  public categories: string[] = [
    'Groceries',
    'Salary',
    'Entertainment',
    'Utilities',
    'Other',
  ];

  constructor() {
    this.transactionForm = this.fb.group({
      name: ['', Validators.required],
      amount: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      type: ['', Validators.required],
      category: ['', Validators.required],
      date: [new Date(), Validators.required],
    });
  }

  public onSubmit(): void {
    if (!this.transactionForm.valid) {
      return;
    }
    const formData = this.transactionForm.value;
    this.dialogRef.close(formData);
  }
}

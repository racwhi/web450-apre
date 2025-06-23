import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { TableComponent } from "../../../shared/table/table.component";
import { NgIf } from "@angular/common";
import { NgForOf } from "@angular/common";

@Component({
  selector: "app-feedback-by-customer",
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent, NgIf, NgForOf],
  template: `
    <h1>Customer Feedback by Customer</h1>

    <div class="feedback-container">
      <form class="form" [formGroup]="customerForm" (ngSubmit)="onSubmit()">
        <div class="form_control">
          <label for="customer">Select Customer</label>
          <select
            class="select"
            formControlName="customer"
            id="customer"
            name="customer"
            required
          >
            <option value="" disabled selected>Select customer</option>

            <option *ngFor="let customer of customers" [value]="customer">
              {{ customer }}
            </option>
          </select>
        </div>

        <div class="form__actions">
          <input
            type="submit"
            class="button button--primary"
            value="Generate Report"
          />
        </div>
      </form>

      <div *ngIf="feedbackByCustomerData.length > 0" class="card chart-card">
        <app-table
          [title]="'Feedback By Customer'"
          [data]="feedbackByCustomerData"
          [headers]="[
            'customer',
            'feedbackSentiment',
            'feedbackText',
            'feedbackSource',
            'feedbackStatus'
          ]"
          [sortableColumns]="[
            'customer',
            'feedbackSentiment',
            'feedbackText',
            'feedbackSource',
            'feedbackStatus'
          ]"
        ></app-table>
      </div>
    </div>
  `,
})
export class FeedbackByCustomerComponent implements OnInit {
  customers: any[] = [];
  feedbackByCustomerData: any[] = [];
  customerForm = this.fb.group({ customer: [null, Validators.required] });

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.http
      .get(`${environment.apiBaseUrl}/reports/customer-feedback/customers`)
      .subscribe({
        next: (data) => {
          this.customers = data as any[];
        },
        error: (err) => {
          console.error("An error occurred while calling customer API", err);
        },
      });
  }

  onSubmit() {
    const customer = this.customerForm.controls["customer"].value || "";
    this.http
      .get(
        `${environment.apiBaseUrl}/reports/customer-feedback/feedback-by-customer?customer=${customer}`
      )
      .subscribe({
        next: (data) => {
          this.feedbackByCustomerData = data as any[];
        },
        error: (err) => {
          console.error("Error fetching data from server: ", err);
        },
      });
  }
}

import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from "../../../shared/table/table.component";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-sales-by-channel",
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  template: `
    <h1>Sales by Channel</h1>
    <div class="sales-container">
      <form class="form" [formGroup]="channelForm" (ngSubmit)="onSubmit()">
        <div class="form__group">
          <label for="channel">Select Channel:</label>
          <select class="select" formControlName="channel" id="channel">
            <option value="" disabled selected>Select a channel</option>
            <option value="Online">Online</option>
            <option value="Retail">Retail</option>
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

      <!--Display table if data exist -->
      @if (salesData.length > 0) {
      <div class="card chart-card">
        <app-table
          [title]="'Sales through ' + selectedChannelName + ' Channel'"
          [data]="salesData"
          [headers]="[
            'salesperson',
            'channel',
            'amount'
          ]"
        ></app-table>
      </div>
      }
    </div>
  `,
  styles: [``],
})
export class SalesByChannelComponent {
  /* salesData array to hold the data that's retrieved 
  channelForm , the reactive form which requires the single control  = channel*/
  salesData: any[] = [];

  channelForm = this.fb.group({ channel: [null, Validators.required] });

  //property to hold channel for the title
  selectedChannelName: string = "";

  //constructor to ingests Formbuilder and HttpClient
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  /* When the form is submitted , retrieves selected channel(Online or Retail), then 
  makes the Http get request to fetch sales data for
   channel or returns an error if unable to retrieve data */
  onSubmit() {
    const channel = this.channelForm.controls["channel"].value || ""; //accepts nulls

    //set selectedChannelName on form submission/
    this.selectedChannelName = channel;

    this.http
      .get(
        `${environment.apiBaseUrl}/reports/sales/sales-by-channel?channel=${channel}`
      )
      .subscribe({
        next: (data) => {
          this.salesData = data as any[];
        },
        error: (err) => {
          console.error("Error fetching data from server: ", err);
        },
      });
  }
}
//http://localhost:3000/api/reports/sales/sales-by-channel?channel=Online
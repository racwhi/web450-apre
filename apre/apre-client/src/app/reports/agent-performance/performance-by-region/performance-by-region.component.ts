// performance-by-region.component.ts
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { TableComponent } from "../../../shared/table/table.component";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-performance-by-region",
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent, NgIf],
  template: `
    <h1>Performance by Region</h1>
    <div class="region-performance-container">
      <form
        class="form"
        [formGroup]="performanceByRegionForm"
        (ngSubmit)="onSubmit()"
      >
        <div class="form_group">
          <label for="region">Select Region for Performance</label>

          <select class="select" formControlName="region" id="region" required>
            <option value="" disabled>Select a region</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Asia">Asia</option>
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

      <!-- Display table if data exists -->

      <div *ngIf="performanceByRegionData.length > 0" class="card chart-card">
        <app-table
          [title]="'Performance for ' + selectedPerformanceRegion + ' Region '"
          [data]="performanceByRegionData"
          [headers]="['region', 'team', 'customerFeedback', 'resolutionTime']"
          [sortableColumns]="['region', 'team', 'customerFeedback', 'resolutionTime']"
        ></app-table>
      </div>
    </div>
  `,

  styles: ``,
})
export class PerformanceByRegionComponent implements OnInit {
  performanceByRegionData: any[] = [];

  selectedPerformanceRegion: string = "";

  performanceByRegionForm = this.fb.group({
    region: [null, Validators.required],
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    const region = this.performanceByRegionForm.controls["region"].value || "";

    // Set the selected region for display

    this.selectedPerformanceRegion = region;

    // Fetch data using the selected region

    this.http

      .get(
        `${environment.apiBaseUrl}/reports/agent-performance/performance-by-region?region=${region}`
      )

      .subscribe({
        next: (data) => {
          this.performanceByRegionData = data as any[];
        },

        error: (err) => {
          console.error("Error fetching data from server: ", err);
        },
      });
  }
}

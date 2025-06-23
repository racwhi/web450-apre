import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackByCustomerComponent } from './feedback-by-customer.component';

describe("FeedbackByCustomerComponent", () => {
  let component: FeedbackByCustomerComponent;
  let fixture: ComponentFixture<FeedbackByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackByCustomerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should create  <h1>", () => {
    const compiled = fixture.nativeElement;
    const h1 = compiled.querySelector("h1");
    expect(h1).toBeTruthy();
  });

  it(" should render the component template", () => {
    const compiled = fixture.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it(" should contain <app-table></app-table>", () => {
    const compiled = fixture.nativeElement;
    const tableElement = compiled.querySelector("app-table");
    expect("app-table").toBeTruthy();
  });
});
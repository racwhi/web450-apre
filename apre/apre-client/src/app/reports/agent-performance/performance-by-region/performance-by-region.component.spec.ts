import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerformanceByRegionComponent } from './performance-by-region.component';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

describe("PerformanceByRegionComponent", () => {
  let component: PerformanceByRegionComponent;
  let fixture: ComponentFixture<PerformanceByRegionComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,PerformanceByRegionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PerformanceByRegionComponent);
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

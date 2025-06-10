import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { SalesByChannelComponent } from "./sales-by-channel.component";
describe("SalesByChannelComponent", () => {
  let component: SalesByChannelComponent;
  let fixture: ComponentFixture<SalesByChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        SalesByChannelComponent, // if standalone
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesByChannelComponent);
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

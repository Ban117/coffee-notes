import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HomeComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should have the correct title", () => {
		expect(component.title).toBe("Welcome to Home Component!");
	});

	it("should render title in a h1 tag", () => {
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector("h1").textContent).toContain(
			"Welcome to Home Component!",
		);
	});
});

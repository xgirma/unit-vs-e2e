import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toEqual('My Store');
  });

  it(`title should link to '/'`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a:nth-child(1)').getAttribute('href')).toEqual('/');
  });

  it(`checkout button should link to '/cart'`, () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a:nth-child(2)').getAttribute('href')).toEqual('/cart');
  });
});

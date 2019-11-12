import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TopBarComponent } from './top-bar.component';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let compiled;

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
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const el = compiled.querySelector('#title > h1');
    expect(el.textContent).toEqual('My Store');
  });

  it(`title should link to '/'`, () => {
    const el = compiled.querySelector('#title');
    expect(el.getAttribute('href')).toEqual('/');
  });

  it(`checkout button should link to '/cart'`, () => {
    const el = compiled.querySelector('#checkout');
    expect(el.getAttribute('href')).toEqual('/cart');
  });
});

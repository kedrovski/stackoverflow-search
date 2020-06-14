import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackauthComponent } from './stackauth.component';

describe('StackauthComponent', () => {
  let component: StackauthComponent;
  let fixture: ComponentFixture<StackauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVotedComponent } from './my-voted.component';

describe('MyVotedComponent', () => {
  let component: MyVotedComponent;
  let fixture: ComponentFixture<MyVotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyVotedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyVotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

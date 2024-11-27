import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAddBookComponent } from './new-add-book.component';

describe('NewAddBookComponent', () => {
  let component: NewAddBookComponent;
  let fixture: ComponentFixture<NewAddBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAddBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

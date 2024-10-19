import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBuscaComponent } from './dialog-busca.component';

describe('DialogBuscaComponent', () => {
  let component: DialogBuscaComponent;
  let fixture: ComponentFixture<DialogBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBuscaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

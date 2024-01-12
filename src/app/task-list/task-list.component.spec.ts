import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TaskService } from '../services/task.service';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [HttpClientTestingModule, HttpClientModule, MatTableModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Task List Component', () => {
    expect(component).toBeTruthy();
  });

  it('table should have 5 columns', () => {
    fixture.detectChanges();
    let tableRows = fixture.nativeElement.querySelectorAll('th');
    expect(tableRows.length).toBe(5);
  })

  it('columns shouldhave headings as Id, Title, Description, Status, Action',()=>{
    fixture.detectChanges();
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
     // Header row
     let headerRow = tableRows[0];
     expect((headerRow.cells[0].innerHTML).trim()).toBe('Id');
     expect((headerRow.cells[1].innerHTML).trim()).toBe('Title');
     expect((headerRow.cells[2].innerHTML).trim()).toBe('Description');
     expect((headerRow.cells[3].innerHTML).trim()).toBe('Status');
  })

  it('should test the row of the table', () => {
    fixture.detectChanges();
    let tableRows = fixture.debugElement.nativeElement.querySelectorAll('tr');
    console.log(tableRows)
    expect(tableRows.length).toBe(2);

    // Data rows
    let row1 = tableRows[0];
    expect(row1.cells[0].innerHTML).toBe(1);
    expect(row1.cells[1].innerHTML).toBe('Create Flowchart');
    expect(row1.cells[2].innerHTML).toBe('Flowchart should contain nodes to represent mini task and arrows to show flow');
    expect(row1.cells[2].innerHTML).toBe('Pending');
  });
});

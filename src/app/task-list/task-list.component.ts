import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNHEADERS } from './task-list';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  dataSource = new MatTableDataSource();
  tableColumns = COLUMNHEADERS.COL_NAMES;
  displayedColumns = COLUMNHEADERS.DISPLAYED_COLS;

  constructor(private taskService: TaskService,
    private router: Router) {

  }

  ngOnInit() {
    this.getTaskList();
  }

  getTaskList() {
    this.taskService.getAllTasks().subscribe((res: any) => {
      var localTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks') || "[]") : res;
      this.dataSource.data = localTasks
      localStorage.setItem('tasks', JSON.stringify(this.dataSource.data))
    });
  }

  editTask(element: any) {
    this.router.navigate(['task-form/' + `${element.id}`])
  }

  deleteTask(element: any) {
    this.taskService.deleteTask(element).subscribe((_: {}) => {
      alert("Task with Task Id - " + element.id + " have been deleted successfully")
      var localItems = JSON.parse(localStorage.getItem('tasks') || "[]");
      var taskIndex = localItems.findIndex((item: any) => item.id === element.id);
      localItems.splice(taskIndex, 1)
      localStorage.setItem('tasks', JSON.stringify(localItems))
      this.getTaskList();
    })
  }

  addNewTask() {
    this.router.navigate(['task-form'])
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

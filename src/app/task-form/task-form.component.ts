import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task, TaskUpdates } from '../task';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  editTaskId: any;
  action = {
    edit: false,
    create: false
  }
  id: any;
  title: any;
  description: any;
  statusList = ['Completed', 'Pending']
  status = {
    field: '',
    ctrl: new FormControl()
  }

  constructor(private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((par: any) => {
      if (par.id) {
        this.action = {
          edit: true,
          create: false
        }
        this.editTaskId = par.id;
        this.getTaskDataById();
      }
      else {
        this.action = {
          edit: false,
          create: true
        }
        this.getNewTaskId();
      }
    })
  }

  getNewTaskId() {
    this.taskService.getAllTasks().subscribe((res: any) => {
      this.id = res.length + 1;
    });
  }

  getTaskDataById() {
    var previousdata = JSON.parse(localStorage.getItem('tasks') || "[]")
    var taskIndex = previousdata.findIndex((item: any) => item.id === Number(this.editTaskId));
    var res = previousdata[taskIndex];
    this.id = res.id;
    this.title = res.title;
    this.description = res.description;
    this.status.field = res.status
  }

  createTask() {
    const params: Task = {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status.field
    }
    if (params.title == "" || params.description == "" || params.status == "") {
      alert("Kindly Fill Mandatory Fields")
    }
    else {
      this.taskService.addTask(params).subscribe((res: any) => {
        if (res) {
          alert("New Task have been created with Task Id -" + this.id)
          var previousdata = JSON.parse(localStorage.getItem('tasks') || "[]")
          previousdata.push(res)
          localStorage.setItem('tasks', JSON.stringify(previousdata))
          this.router.navigate(['./'])
        }
      })
    }
  }

  updateTask() {
    const updateTask = new TaskUpdates(
      Number(this.editTaskId),
      this.title,
      this.description,
      this.status.field
    )
    if (updateTask.title == "" || updateTask.description == "" || updateTask.status == "") {
      alert("Kindly Fill Mandatory Fields")
    }
    else {
      this.taskService.updateTask(updateTask).subscribe((res: any) => {
        alert("Task with taskId - " + this.editTaskId + " have been updated successfully.")
        var previousdata = JSON.parse(localStorage.getItem('tasks') || "[]")
        var taskIndex = previousdata.findIndex((item: any) => item.id === Number(this.editTaskId));
        previousdata[taskIndex] = updateTask
        localStorage.setItem('tasks', JSON.stringify(previousdata))
        this.router.navigate(['./'])
      })
    }
  }

  goToList() {
    this.router.navigate(['./'])
  }
}

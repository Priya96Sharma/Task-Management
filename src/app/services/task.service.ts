import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task';
const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskApiUrl = 'api/task';
  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskApiUrl);
  }

  getTaskById(id: any): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskApiUrl + `/${id}`);
  }

  addTask(taskData: Task): Observable<Task> {
    return this.http.post<Task>(this.taskApiUrl, taskData, cudOptions);
  }

  updateTask(taskData: Task): Observable<null | Task> {
    return this.http.put<Task>(this.taskApiUrl, taskData, cudOptions);
  }

  deleteTask(task: Task | number): Observable<Task> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.taskApiUrl}/${id}`;

    return this.http.delete<Task>(url, cudOptions);
  }
}

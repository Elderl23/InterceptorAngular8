import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  angForm: FormGroup;
  private MsgConsole = '';
  constructor(private http: HttpClient,private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ["", Validators.required]
    });
  }

  onSubmit() {
    if (this.angForm.valid) {
      console.log(this.angForm.value);
    } else {
      alert("FILL ALL FIELDS");
    }
  }

  initInterceptorPost(type) {
    let body = {
      username: '',
      password: ''
    }

    if(type === 1){
      body.username = 'test';
      body.password = 'test';
    }else {
      body.username = 'test2';
      body.password = 'test';
    }

    this.login(body)
      .subscribe(
        data => {
          this.MsgConsole = JSON.stringify(data);
        },
        error => {
          this.MsgConsole = JSON.stringify(error);
        });
  }

  initInterceptorGet(type) {

    this.getUsers(type)
      .subscribe(
        data => {
          this.MsgConsole = JSON.stringify(data);
        },
        error => {
          this.MsgConsole = JSON.stringify(error);
        });
  }

  login(body) {
    return this.http.post<any>(`/login`, body);
  }

  getUsers(type) {
    let validUrl = '';
    if(type === 1){
      validUrl = `/users/${1}`
    }else {
      validUrl = `/users/${0}`
    }
    return this.http.get<any>(validUrl);
  }

  title = 'Ejemplo de interceptors en Angular 8!';
}

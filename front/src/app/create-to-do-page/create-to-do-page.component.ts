import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Requester } from '../shared/services/requester.service';




@Component({
  selector: 'create-to-do-page',
  templateUrl: './create-to-do-page.component.html',
  styleUrls: ['./create-to-do-page.component.css']
})
export class CreateToDoPageComponent{
  id = ""
  link = null
  createToDo = new FormGroup({})



  constructor(private todo: Requester,private router: Router) {
    this._createForm()
  }


  private _createForm() {
    this.createToDo = new FormGroup({
      name: new FormControl(null),
    })
  }



  todoObj = {
    name: "err",
    creator: "any",
    access: "public",
    listItems: []
  }

  sendToDo(){
    if(this.createToDo.value.name == null){
      this.todoObj.name = "Untitled"
    }else{
      this.todoObj.name = this.createToDo.value.name
    }
    this.todo.requester(`api/todo/createtodo`,this.todoObj).subscribe((res:HttpResponse<any>)=>{
      //console.log(res)
      if(res.status==201){
        this.id = res.body._id
        this.router.navigate([`todo`], {
          queryParams: {id: this.id}
        });
      }else if(res.status==202){
        console.log(res)
      }
    },(err:HttpErrorResponse)=>console.error(err))
  }

}

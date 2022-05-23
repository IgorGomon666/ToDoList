import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Requester } from 'src/app/shared/services/requester.service';
import { MainComponent } from '../main.component'

@Component({
  selector: 'app-list',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit{
  toBeReplaced = null
  active = null
  hoverState = true
  hidden = false
  style = "display:flex;"
  refresh = MainComponent
  switch = true
  id = ""
  whatToDelete = {
    id: "",
    which: null,
    mode: "deleteToDo"
  }
  constructor(private route: ActivatedRoute, private todod: Requester){
    this.route.queryParams.subscribe(params=> {
      this.id = params["id"]
    })
  }
  ngOnInit(){
    this.hidden = false
    this.style = "display:flex;"
    if(this.whichCheck){
      if(this.todo.checked[this.i]){
        this.hidden = true
        this.style = "display:none;"
      }
    }else{
      if(!this.todo.checked[this.i]){
        this.hidden = true
        this.style = "display:none;"
      }
    }
  }
  @Input() whichCheck:any
  @Input() todo:any
  @Input() i:any
  @Input() changeOrder:any
  @Output() changeToDoName = new EventEmitter<string>()


  deleteToDo(a:any){
    this.whatToDelete.id = this.id
    this.whatToDelete.which = a
    this.todod.requester(`api/todo/changeToDo`,this.whatToDelete).subscribe((res:HttpResponse<any>)=>{
      console.log(res)
      if(res.status==201){
        this.changeToDoName.emit("")
      }else if(res.status==202){
        alert("Something went wrong")
      }
    },(err:HttpErrorResponse)=>console.error(err))
  }
  checkChange(i:any){
    if(this.todo.checked[i]){
      this.switch = false
    }else{
      this.switch = true
    }
    this.todod.requester(`api/todo/changeToDo`,{mode: "changeCheck", id: this.id, which: i, switch: this.switch}).subscribe((res:HttpResponse<any>)=>{
      if(res.status==201){
        this.todo.checked[i] = !this.todo.checked[i]
        this.changeToDoName.emit("")
      }else if(res.status==202){
        console.log(res)
      }
    },(err:HttpErrorResponse)=>console.error(err))
  }
  fieldChanger(i:any,e:any){
    this.todod.requester(`api/todo/changeToDo`,{mode: "changeName", id: this.id, which: i, newName: e.target.value}).subscribe((res:HttpResponse<any>)=>{
      console.log(res.body)
      if(res.status==201){

      }else if(res.status==202){
        console.log(res)
      }
    },(err:HttpErrorResponse)=>console.error(err))
  }
  hover(when:any){
    if(when){
      this.hoverState = false
    }else{
      this.hoverState = true
    }
  }
  keytab(event:any, direction:any, which:any){
    if(direction=='down'){
      try{
        let element
        console.log(which,event.path[4].children.length-2)
        if(which==event.path[4].children.length-2){
          element = event.path[3].nextElementSibling.children[0]
        }else{
          element = event.path[3].nextSibling.children[0].children[2].children[0]
        }
        if(element){
          element.focus()
        }
        element = ""
      }catch(err){
        //console.log(err)
      }
    }else if(direction=='up'){
      try{
        let element = event.path[4].children[which-1].children[0].children[2].children[0]
        if(element){
          element.focus()
        }
        element = ""
      }catch{}
    }
  }
}

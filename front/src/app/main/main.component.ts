import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { Requester } from '../shared/services/requester.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  firstItem = null
  secondItem = null
  proColor = ""
  changeOrder = false
  proVal = false
  source = timer(0,10);
  timeToWidth = 0
  progressBar = `width: ${this.timeToWidth}%;position: absolute;bottom: 13px;height: 7px;background-color: #6B6B6B;`
  nameHover = true
  notFound = ""
  close = true
  random = `target${Math.floor(Math.random() * 1000)}`
  style = "display:none;"
  completed = 0
  hideGo = true
  idInfo = true
  checkedArray = []
  created = true
  noUpload = true
  whatToSend = {
    mode: "",
    id: "",
    name: "",
  }
  input = ""
  todoObj = {
    _id: "",
    name:"",
    creator:"",
    listItems:[],
    mode: "",
    checked:[]
  }
  id = ""
  constructor(private todo: Requester, private route: ActivatedRoute, private router: Router, private titleService: Title){
    this.route.queryParams.subscribe(params=> {
      this.id = params["id"]
    })
    if(this.id==undefined){
      this.todoObj.name = "No id provided(404)"
      this.notFound = "color:red;"
    }
  }

  ngOnInit(){
    this.completed = 0
    this.todo.requester(`api/todo/getToDo`,{id: this.id}).subscribe((res:HttpResponse<any>)=>{
      console.log(res.status, res)
      if(res.status==201&&res.body._id!==null){
        this.completed = 0
        this.todoObj = res.body
        this.titleService.setTitle(this.todoObj.name)
        res.body.checked.forEach((element: boolean) => {
          if(element == true){
            this.completed++
          }
        });
      }else if(res.status==202){
        this.todoObj.name = "Can't find this id(404)"
        this.notFound = "color:red;"
      }
    },(err:HttpErrorResponse)=>console.error(err))

    console.log("main ready")
  }
  onInput(e:any){
    this.hideGo = true
    this.created = true
    this.input = e.target.value
    if(this.input){
      this.hideGo = false
    }
  }
  createToDo(){
    this.created = true
    this.whatToSend.mode = "fastAddToDo"
    this.whatToSend.id = this.id
    this.whatToSend.name = this.input
    this.todo.requester(`api/todo/changeToDo`,this.whatToSend).subscribe((res:HttpResponse<any>)=>{
      console.log(res)
      if(res.status==201){
        this.noUpload = true
        this.created = false
        this.input = ""
        this.ngOnInit()
      }else if(res.status==202){
        this.noUpload = false
      }
    },(err:HttpErrorResponse)=>console.error(err))
  }
  hideCopm(){
    if(this.style == "display:none;"){
      this.style = "display:flex;"
    }else{
      this.style = "display:none;"
    }
  }
  share(){
    if(this.close){
      this.timeToWidth = 0
      navigator.clipboard.writeText(`https://checklist.in-entwurf.de/todo?id=${this.id}`)
      this.close = false
      this.source.subscribe(val=>{
        if(val == 300){
          this.close = true
        }
        this.timeToWidth = 100-(val*(1/3))
        this.progressBar = `width: ${this.timeToWidth}%;position: absolute;bottom: 13px;height:5px;background-color: #949494;`
      })
    }
  }
  copyToDoList(){
    this.todo.requester(`api/todo/copyToDo`,{id: this.id}).subscribe((res:HttpResponse<any>)=>{
      if(res.status==201){
        window.open("/todo?id="+res.body.id)
      }else if(res.status==202){
        console.log(res)
      }

    },(err:HttpErrorResponse)=>console.error(err))
  }
  createToDoList(){
    window.open("/createtodo")
  }
  pro(){
    this.proVal = !this.proVal
    if(this.proVal){
      this.proColor = 'background-color: #434242;'
    }else{
      this.proColor = 'background-color: white;'
    }
  }
  nameChanger(e:any){
    this.todo.requester(`api/todo/changeToDo`,{mode: "changeListName", id: this.id, newListName: e.target.value}).subscribe((res:HttpResponse<any>)=>{
      if(res.status==201){

      }else if(res.status==202){
        console.log(res)
      }
    },(err:HttpErrorResponse)=>console.error(err))
  }

  print(){
    window.print()
  }

  keytab(event:any){
    try{
      event.path[2].children[2].children[0].children[0].children[0].children[2].children[0].focus()
    }catch(err){
      //console.log(err)
    }
  }
}

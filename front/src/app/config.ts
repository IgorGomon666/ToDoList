import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class MyAppConfig{

  constructor(){
  }
  // defineUri(uri:string){
  //   if(uri=="http://localhost:5000"){
  //     return
  //   }
  // }
  // localDevUri = "http://localhost:5000"
  // devUri = "http://localhost:5000"
  test = 10

}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class Requester{

  constructor(private http:HttpClient){
  }

  requester(uri:string, objToDeal:Object){
    return this.http.post(`/${uri}`,objToDeal,{observe: 'response'})
  }

}

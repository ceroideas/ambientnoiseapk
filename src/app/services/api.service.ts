import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "https://tuwordpress.online/ambientnoice/public/api";

  constructor(public http: HttpClient) { }

  login(email, password){
    return this.http.post(this.url+'/login',{email:email, password: password});
  }

  register(data){
    return this.http.post(this.url+'/register',data);
  }

  getCategories(){
    return this.http.get(this.url+'/getCategories');
  }

  getStablishments(data){
    return this.http.post(this.url+'/getStablishments',data);
  }

  getStablishment(id){
    return this.http.get(this.url+'/getStablishment/'+id);
  }

  saveStablishment(data){
    return this.http.post(this.url+'/saveStablishment',data);
  }


}

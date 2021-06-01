import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import WebRequest from './models/WebRequest';
import WebResponse from './models/WebResponse';
const host:string = "http://localhost:8080/imagemosaic/";
const host2:string =  "https://imagemosaic.herokuapp.com";
const url:string = host+"/app/generatemosaic"; 
const urlTest:string = host+"/app/test"; 
@Injectable({
  providedIn: 'root'
})
export class ImageprocessService {

  constructor(private http:HttpClient) { }

  testServer():Observable<WebResponse> { 
    
    return this.http.get<WebResponse>(url);
  }
  generateMosaicv2(imageData:string):Observable<Blob> {
    const req:WebRequest = {
      imageData: imageData
    }
    
    return this.http.post<Blob>(url, req,  { responseType: 'blob' as 'json' });
  }
}

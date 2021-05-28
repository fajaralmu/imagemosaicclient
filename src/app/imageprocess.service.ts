import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import WebRequest from './models/WebRequest';
import WebResponse from './models/WebResponse';

@Injectable({
  providedIn: 'root'
})
export class ImageprocessService {

  constructor(private http:HttpClient) { }

  generateMosaic(imageData:string):Observable<WebResponse> {
    const req:WebRequest = {
      imageData: imageData
    }
    console.debug("will generate mosaic");
    const url:string = "http://localhost:8080/imagemosaic/app/generatemosaic";
    return this.http.post<WebResponse>(url, req);
  }
}

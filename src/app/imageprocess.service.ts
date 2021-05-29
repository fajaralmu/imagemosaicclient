import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import WebRequest from './models/WebRequest';
import WebResponse from './models/WebResponse';
const url2:string = "http://localhost:8080/imagemosaic/app/generatemosaic";
    const url :string = "https://imagemosaic.herokuapp.com/app/generatemosaic";
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
    
    return this.http.post<WebResponse>(url, req);
  }
  generateMosaicv2(imageData:string):Observable<Blob> {
    const req:WebRequest = {
      imageData: imageData
    }
    console.debug("will generate mosaic");
    
    return this.http.post<Blob>(url, req,  { responseType: 'blob' as 'json' });
  }
}

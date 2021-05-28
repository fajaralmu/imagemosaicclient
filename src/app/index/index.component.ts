import { Component, OnInit } from '@angular/core';
import Hero from './../models/Hero';
import WebRequest from './../models/WebRequest';
import { ImageprocessService } from './../imageprocess.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private service:ImageprocessService) { }
  sampleHero:Hero = new Hero();
  imageData?:string;
  ngOnInit(): void {
  }
  changeImage(e:Event):void {
    this.toBase64(e.target as HTMLInputElement)
    .then((res)=>{
        this.imageData = res;
    })
    .catch(console.error)
  }
  removeImage():void {
    this.imageData = undefined;
  }
  submit():void {
    if (!this.imageData) return;
    this.service.generateMosaic(this.imageData);
  }
  toBase64(fileInput:HTMLInputElement):Promise<any>{
    return new Promise(function(resolve, reject){
        try{
          if (fileInput.files == null) {
            throw new Error("File not found");
          }
            const reader = new FileReader();
            reader.readAsDataURL(fileInput.files[0]);
            reader.onload = function() { resolve(reader.result); }
            reader.onerror = function(error) {
                reject(error);
            }
        }catch(e){
            reject(e);
        }
    });
   
}

}

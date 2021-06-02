import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Hero from './../models/Hero'; 
import { ImageprocessService } from './../imageprocess.service'; 
import { doItLater } from './../util/EventUtil';
import WebResponse from './../models/WebResponse';
const DEFAULT_RESULT_WIDTH:number = 600;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

 
  sampleHero: Hero = new Hero();
  imageData?: string;
  imageDataResult?: string;
  resultWidth:number = DEFAULT_RESULT_WIDTH;
  progress:number = 0;
  constructor(private service: ImageprocessService ) {
    
  } 

  ngOnInit(): void { }

  zoomResult(factor:number) {
    if (factor == 0) {
      this.resultWidth = DEFAULT_RESULT_WIDTH;
      return;
    }
    if (this.resultWidth+factor <0) {return;}
    this.resultWidth+=factor;
  }
  changeImage(e: Event): void {
    this.toBase64(e.target as HTMLInputElement)
      .then((res) => {
        this.imageData = res;
      }).catch(console.error)
  }
  removeImage(): void {
    this.imageData = undefined;
  }
  scrollBottom() {
    const opt: ScrollToOptions = { top: document.body.scrollHeight, behavior: 'smooth' };
    doItLater(function () { window.scrollTo(opt); }, 100);
  }
  handleResult = (response: Blob) => { 
    var reader = new FileReader();
    reader.readAsDataURL(response);
    reader.onloadend = () => {
      if (typeof (reader.result) == 'string') {
        this.imageDataResult = reader.result; 
        this.scrollBottom();
      }
    }
  }
  onProgressCallback = (body:WebResponse) => {
    if (body.percentage >= 100) {
      this.progress = 0;
      return;
    }
    this.progress = Math.floor(body.percentage);
  }
  serverReady(){
    this.service.connectWebsocket(this.onProgressCallback);
  }
  handleError(error:any){
    this.imageDataResult = undefined;
  }
  preSubmit(): void {
    this.progress = 0;
    this.resultWidth = DEFAULT_RESULT_WIDTH;
    this.imageDataResult = undefined;
  }
  toBase64(fileInput: HTMLInputElement): Promise<any> {
    return new Promise(function (resolve, reject) {
      try {
        if (fileInput.files == null) {
          throw new Error("File not found");
        }
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = function () { resolve(reader.result); }
        reader.onerror = function (error) {
          reject(error);
        }
      } catch (e) {
        reject(e);
      }
    });

  }

}

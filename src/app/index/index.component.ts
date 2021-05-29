import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Hero from './../models/Hero';
import WebRequest from './../models/WebRequest';
import { ImageprocessService } from './../imageprocess.service';
import WebResponse from './../models/WebResponse';
import { doItLater } from './../util/EventUtil';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

 
  sampleHero: Hero = new Hero();
  imageData?: string;
  imageDataResult?: string;
  loading: boolean = false;
  error: boolean = false;
  constructor(private service: ImageprocessService ) {
    
  } 

  ngOnInit(): void { }
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
        this.loading = false; 
        
      }
    }
  }
  submit(): void {
    if (!this.imageData) return;
    this.loading = true;
    this.imageDataResult = undefined;
    this.error = false;
    this.service.generateMosaicv2(this.imageData).subscribe(this.handleResult, (error) => {
      this.loading = false;
      this.error = true;
      this.imageDataResult = undefined;
    });
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

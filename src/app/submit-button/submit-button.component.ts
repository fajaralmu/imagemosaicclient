import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { ImageprocessService } from './../imageprocess.service';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent implements OnInit {

  @Input() imageData?:string;
  @Output() onResult: EventEmitter<Blob> = new EventEmitter();
  @Output() onError: EventEmitter<any> = new EventEmitter();
  @Output() onBeforeSubmit: EventEmitter<any> = new EventEmitter();
  constructor(private service: ImageprocessService) { }

  submit():void{
    if (!this.imageData) return;
    this.onBeforeSubmit.emit();
    this.service.generateMosaicv2(this.imageData).subscribe(
      (response:Blob)=>{
        this.onResult.emit(response);
      }
      , (error) => {
       this.onError.emit(error);
    });
  }

  ngOnInit(): void {
  }

}

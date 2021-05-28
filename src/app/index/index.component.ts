import { Component, OnInit } from '@angular/core';
import Hero from './../models/Hero';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }
  sampleHero:Hero = new Hero();
  ngOnInit(): void {
  }
  onChange(e:Event):void {
    console.debug("change event: ", e.type);
  }
}

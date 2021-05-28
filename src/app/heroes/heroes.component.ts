import { Component, Input, OnInit } from '@angular/core';
import Hero from './../models/Hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  @Input() sampleHero?:Hero;
  hero:Hero = {
    id:1,
    name:'Windstorm'
  }

  constructor() { }

  ngOnInit(): void {
  }

}

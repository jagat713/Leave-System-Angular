import { Component, EventEmitter, Output } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  @Output() send=new EventEmitter<any>()
  landingPage()
  {
    this.send.emit()
  }
  ngAfterViewInit(): void
  {
    gsap.from(".hero-section",
      {
        opacity:0,
        y:30,
        duration:2,
        stagger:4
      }
    );
    
  }  
}

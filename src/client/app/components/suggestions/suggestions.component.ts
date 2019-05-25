import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as Typed from 'typed.js';
import Typed from 'typed.js';

@Component({
    selector: 'app-suggestions',
    templateUrl: './suggestions.component.html',
    styleUrls: ['./suggestions.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SuggestionsComponent implements OnInit {
  static isTalking;
  static myVar;
  private options;
  private typed;


  constructor() {
    SuggestionsComponent.isTalking = true;
     this.options = {
      strings: ['Hello, my name is Nika. <br> How can I help you?'],
      typeSpeed: 30,
      showCursor: true,
      cursorChar: '',
      loop: false,
      onComplete: function(self) {
        SuggestionsComponent.isTalking = false;
        clearInterval(SuggestionsComponent.myVar);
      }
    };
    console.log('suggestions');
  }

  isTalking(): boolean {
    return SuggestionsComponent.isTalking;
  }

  ngOnInit() {
    SuggestionsComponent.myVar = setInterval(this.talking, 200);
    this.typed = new Typed('.typing-element', this.options);
    console.log('init initiated')
  }

  /**
   * Change pic to simulate talking status
   */
  talking(): void {
    SuggestionsComponent.isTalking = !SuggestionsComponent.isTalking;
  }

  /**
   * On click "suggest", Nika suggests something for buying or wearing
   */
  suggest(): void {
    // Clean typed options.
    this.typed.destroy();
    // Each time we click suggest, clean interval to prevent many clicks before it ends to suggest
    clearInterval(SuggestionsComponent.myVar);
    SuggestionsComponent.myVar = setInterval(this.talking, 200);
    this.options = {
      strings: [this.getRandomSentence()],
      typeSpeed: 30,
      showCursor: true,
      cursorChar: '',
      loop: false,
      onComplete: function(self) {
        SuggestionsComponent.isTalking = false;
        clearInterval(SuggestionsComponent.myVar);
      }
    };
    this.typed = new Typed('.typing-element', this.options);
  }

  getRandomSentence(): string {
    const randomSentences = [
      'Alex is gay',
      'Alex is lazy',
      'Alex is the boss'
    ];

    return randomSentences[Math.floor(Math.random() * randomSentences.length)];
  }
}

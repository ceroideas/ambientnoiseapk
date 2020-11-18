import { Component, Input, ViewChildren, QueryList, ElementRef, EventEmitter, Output, Renderer2, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavparamsService } from '../../services/navparams.service';
import { Gesture, GestureConfig, createGesture } from '@ionic/core';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-sala-detalle',
  templateUrl: './sala-detalle.page.html',
  styleUrls: ['./sala-detalle.page.scss'],
})
export class SalaDetallePage implements OnInit {

  @ViewChildren('tinderCard') tinderCards: QueryList<ElementRef>;
  tinderCardsArray: Array<ElementRef>;

  @Output() choiceMade = new EventEmitter();

  moveOutWidth: number;
  shiftRequired: boolean;
  transitionInProgress: boolean;
  heartVisible: boolean;
  crossVisible: boolean;

  cards:any = [];
  name;

  // likes:any;

  user = JSON.parse(localStorage.getItem('ANuser'))

  constructor(public nav: NavController, public navparams: NavparamsService, private renderer: Renderer2, public api: ApiService, public events: EventsService) {
  	let params = this.navparams.getParam();

    this.cards = params.us
    // this.likes = params.likes;

  	// this.name = data.name;
  	// for (let i in data.gallery) {

   //    if (!this.likes.find(x=>x.gallery_id == data.gallery[i].id)) {
  	// 	  this.cards.push(data.gallery[i]);
   //    }
  	// }

  	// console.log(this.cards, this.likes);

  }

  ngOnInit() {
  }

  userClickedButton(event, heart) {
    event.preventDefault();
    if (!this.cards.length) return false;
    if (heart) {
      this.tinderCardsArray[0].nativeElement.style.transform = 'translate(' + this.moveOutWidth + 'px, -100px) rotate(-30deg)';
      this.toggleChoiceIndicator(false,true);
      this.emitChoice(heart, this.cards[0]);
    } else {
      this.tinderCardsArray[0].nativeElement.style.transform = 'translate(-' + this.moveOutWidth + 'px, -100px) rotate(30deg)';
      this.toggleChoiceIndicator(true,false);
      this.emitChoice(heart, this.cards[0]);
    };
    this.shiftRequired = true;
    this.transitionInProgress = true;
  };

  handlePan(event) {

    if (event.deltaX === 0 || (event.center.x === 0 && event.center.y === 0) || !this.cards.length) return;

    if (this.transitionInProgress) {
      this.handleShift();
    }

    this.renderer.addClass(this.tinderCardsArray[0].nativeElement, 'moving');

    if (event.deltaX > 0) { this.toggleChoiceIndicator(false,true) }
    if (event.deltaX < 0) { this.toggleChoiceIndicator(true,false) }

    let xMulti = event.deltaX * 0.03;
    let yMulti = event.deltaY / 80;
    let rotate = xMulti * yMulti;

    this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)');

    this.shiftRequired = true;

  };

  handlePanEnd(event) {

    this.toggleChoiceIndicator(false,false);

    if (!this.cards.length) return;

    this.renderer.removeClass(this.tinderCardsArray[0].nativeElement, 'moving');

    let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;
    if (keep) {

      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', '');
      this.shiftRequired = false;

    } else {

      let endX = Math.max(Math.abs(event.velocityX) * this.moveOutWidth, this.moveOutWidth);
      let toX = event.deltaX > 0 ? endX : -endX;
      let endY = Math.abs(event.velocityY) * this.moveOutWidth;
      let toY = event.deltaY > 0 ? endY : -endY;
      let xMulti = event.deltaX * 0.03;
      let yMulti = event.deltaY / 80;
      let rotate = xMulti * yMulti;

      this.renderer.setStyle(this.tinderCardsArray[0].nativeElement, 'transform', 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)');

      this.shiftRequired = true;

      this.emitChoice(!!(event.deltaX > 0), this.cards[0]);
    }
    this.transitionInProgress = true;
  };

  toggleChoiceIndicator(cross, heart) {
    this.crossVisible = cross;
    this.heartVisible = heart;
  };

  handleShift() {
    this.transitionInProgress = false;
    this.toggleChoiceIndicator(false,false)
    if (this.shiftRequired) {
      this.shiftRequired = false;
      this.cards.shift();
    };
  };

  emitChoice(heart, card) {

    this.api.likeGallery({user_id:this.user.id,liked_user_id:card.id,like:heart}).subscribe(data=>{
      // this.likes = data;
      this.events.publish('getAprobed');
      this.events.publish('getAprobedAll');
    })
    // this.choiceMade.emit({
    //   choice: heart,
    //   payload: card
    // })
  };

  ngAfterViewInit() {
    this.moveOutWidth = document.documentElement.clientWidth * 1.5;
    this.tinderCardsArray = this.tinderCards.toArray();
    this.tinderCards.changes.subscribe(()=>{
      this.tinderCardsArray = this.tinderCards.toArray();
    })
  };

  verGaleria(us)
  {
    this.navparams.setParam(us);
    this.nav.navigateForward('tabs/home/galeria/'+us.id);
  }

}

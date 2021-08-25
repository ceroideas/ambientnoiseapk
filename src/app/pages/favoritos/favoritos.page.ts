import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favoritos:any;
  tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;
  user = JSON.parse(localStorage.getItem('ANuser'));
  lat = localStorage.getItem('lat');
  lon = localStorage.getItem('lon');

  constructor(public api: ApiService, public events: EventsService) { }

  ngOnInit() {

    this.events.destroy('reloadFavorites');
    this.events.subscribe('reloadFavorites',()=>{
      this.getFavorites();
    });
    this.events.destroy('restoreCourseFv');
    this.events.subscribe('restoreCourseFv',()=>{
      this.tutorialValue = parseInt(localStorage.getItem('tutorial')) || 0;
    });
    this.getFavorites();
  }

  getLocal(l)
  {
    localStorage.setItem('goBackDetails',"1");
    localStorage.setItem('actualLocal',JSON.stringify(l));
  }

  getFavorites()
  {
    this.api.getFavorites({id:this.user.id,lat:this.lat,lon:this.lon}).subscribe(data=>{
      this.favoritos = data;

      console.log(data);
    })
  }

}

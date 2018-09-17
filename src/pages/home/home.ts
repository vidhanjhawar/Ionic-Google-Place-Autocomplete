import { Component, NgZone,ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public zone: NgZone,private mapsAPILoader: MapsAPILoader) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  updateSearchResults (){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
  	(predictions, status) => {
      this.autocompleteItems = [];
      if(predictions) {
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
            });
        });
      }
    });
  }
}

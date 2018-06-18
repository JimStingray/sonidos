import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALS } from '../../data/data.animals';
import { AnimalInterface } from "../../interfaces/animal.interface";
import { Refresher, reorderArray } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animals:AnimalInterface[]=[]; // Use AnimalInterface

  audio = new Audio();          // Create instance to use Audio (HTML5)
  durationAudio:any;
  order:boolean=false;

  constructor() {
    // Clone object in constructor
    this.animals = ANIMALS.slice(0);
  }

  play(animal:AnimalInterface){

    this.pauseAudio(animal);

    if(animal.playing){
      animal.playing = false;
      return;   // Exit function
    }

    console.log(animal);

    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.playing = true;

    this.durationAudio = setTimeout(()=> animal.playing =false, animal.duration * 1000 );

  }

  // Pause audio
  private pauseAudio(animalSel:AnimalInterface){
    clearTimeout(this.durationAudio);
    this.audio.pause();
    this.audio.currentTime=0;

    for(let animal  of this.animals){
      if(animal.name != animalSel.name){
        animal.playing = false;
      }
    }
  }

  // Delete item
  deleteItem(index:number){
    this.animals.splice(index,1);
  }

  // Reload list
  doRefresh(refresher:Refresher){
    console.log('Begin async operation', refresher);

    setTimeout(()=> {
      console.log('Async operation has ended');
      this.animals = ANIMALS.slice(0);
      refresher.complete();
    }, 1500)
  }

  // Reorder list
  reorderAnimals(indices:any){
    console.log(indices);

    this.animals = reorderArray(this.animals, indices);
  }

}

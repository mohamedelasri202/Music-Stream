import { Component, inject } from '@angular/core';
import { AddTrack } from '../add-track/add-track';
import { TrackService } from '../../services/track-service';
import { StorageService } from '../../services/storage-service';
import { UntypedFormBuilder } from '@angular/forms';

import { Track } from '../../modules/track/track-module';

@Component({
  selector: 'app-library',
  imports: [AddTrack],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library {
  trackService = inject(TrackService)
  tracks = this.trackService.tracks

  async deleteTrack(id:number){
    if(id === undefined ) return;
    await  this.trackService.deleteTrack(id)

  }
  async updateTrack(track:Track) {

    
  }

}

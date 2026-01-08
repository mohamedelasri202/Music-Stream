import { Component, inject } from '@angular/core';
import { AddTrack } from '../add-track/add-track';
import { TrackService } from '../../services/track-service';

@Component({
  selector: 'app-library',
  imports: [AddTrack],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library {
  trackService = inject(TrackService)

  tracks = this.trackService.tracks

}

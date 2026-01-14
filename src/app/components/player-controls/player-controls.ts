import { Component, inject } from '@angular/core';
import { AudioPlayerService } from '../../services/audio-player-service';
@Component({
  selector: 'app-player-controls',
  imports: [],
  templateUrl: './player-controls.html',
  styleUrl: './player-controls.css',
})
export class PlayerControls {

  public audioService = inject(AudioPlayerService);

  

}

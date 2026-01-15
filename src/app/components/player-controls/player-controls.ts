import { Component, inject } from '@angular/core';
import { AudioPlayerService } from '../../services/audio-player-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-player-controls',
  imports: [CommonModule],
  templateUrl: './player-controls.html',
  styleUrl: './player-controls.css',
})
export class PlayerControls {

  public audioService = inject(AudioPlayerService);

  currentTrack = this.audioService.currentTrack;


 onVolumeChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = Number(input.value);
  
  // Call the service method we discussed
  this.audioService.setVolume(value);
}

}

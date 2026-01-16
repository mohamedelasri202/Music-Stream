import { Component, inject } from '@angular/core';
import { AudioPlayerService } from '../../services/audio-player-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-player-controls',
  imports: [CommonModule, RouterLink],
  templateUrl: './player-controls.html',
  styleUrl: './player-controls.css',
})
export class PlayerControls {

  public audioService = inject(AudioPlayerService);

  currentTrack = this.audioService.currentTrack;


 onVolumeChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const value = Number(input.value);
  
  this.audioService.setVolume(value);
}

}

import { Injectable, signal } from '@angular/core';
import { Track } from '../modules/track/track-module';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {

  private audio  = new Audio;
  state = signal<'playing'|'paused'|'buffering'|'stopped'>('stopped');
  currentTrack = signal<Track | null>(null);
  volume = signal <number>(0.5);
  progress = signal <number>(0);

  constructor(){
    this.audio.addEventListener('timeupdate',()=> {
        this.progress.set(this.audio.currentTime)
    })
    this.audio.addEventListener('play',()=>this.state.set('playing'))
    this.audio.addEventListener('pause',()=>this.state.set('paused'))
    this.audio.addEventListener('waiting',()=>this.state.set('buffering'))
    this.audio.addEventListener('ended',()=>this.state.set('stopped'))
  }

  loadTrack(track:Track){
    this.currentTrack.set(track);
    const  url = URL.createObjectURL(track.file);
    this.audio.src = url;
    this.audio.load();
    this.play();

  }

  play(){
    if(this.currentTrack()){
      this.audio.play();
    }

  }

  pause(){
    this.audio.pause();
  }

  setVolume(value:number){

    this.volume.set(value);
    this.audio.volume = value;

  }

}

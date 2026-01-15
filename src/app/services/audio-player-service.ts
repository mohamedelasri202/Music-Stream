import { inject, Injectable, NgZone, signal } from '@angular/core';
import { Track } from '../modules/track/track-module';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class AudioPlayerService {
  
  private zone = inject(NgZone)
  private storage = inject(StorageService)
  public audio  = new Audio;
  state = signal<'playing'|'paused'|'buffering'|'stopped'>('stopped');
  currentTrack = signal<Track | null>(null);
  volume = signal <number>(0.5);
  progress = signal <number>(0);

  constructor(){
    this.audio.addEventListener('timeupdate',()=> {
        this.progress.set(this.audio.currentTime)
    })

    this.audio.addEventListener('playing', () => {
  this.zone.run(() => {
    console.log("Audio is officially PLAYING");
    this.state.set('playing');
  });
});
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

  play() {
  if (this.currentTrack()) {
    this.audio.play();
    this.state.set('playing'); 
    console.log("State set to playing");
  }
}

  pause() {
  this.audio.pause();
  this.state.set('paused'); 
  console.log("State set to paused");
}

  setVolume(value:number){

    this.volume.set(value);
    this.audio.volume = value;

  }
  async goToNext(track:Track){
    
     const currentTrack = this.currentTrack();
     if(!currentTrack) return
    const playlist =  await this.storage.tracks.toArray();
    const currentIndex = playlist.findIndex(t => t.id === currentTrack.id);
    const nextIndex = currentIndex + 1
    if(nextIndex < playlist.length){
      const nextTrack = playlist[nextIndex]
      this.loadTrack(nextTrack);
    }else{
      console.log("no more songs in the list")
    }
  }

  async goBack(track:Track){
    const currentTrack = this.currentTrack()
      if(!currentTrack) return 
      const playlist =  await this.storage.tracks.toArray()
       const currentIndex  = playlist.findIndex(t=> t.id === currentTrack.id);
       if(currentIndex > 0){
        const prevIndex = currentIndex - 1
        const prevTrack = playlist[prevIndex]
        this.loadTrack(prevTrack)
       }
       
    
  }



}

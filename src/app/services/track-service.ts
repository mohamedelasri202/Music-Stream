import { Injectable, signal } from '@angular/core';
import { Track } from '../modules/track/track-module';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class TrackService {

  private trackSignal = signal<Track[]>([])
  
      tracks = this.trackSignal.asReadonly();
      status = signal<'loading'| 'error'| 'success'>('loading')


      constructor(private storage: StorageService) {
        this.init();
        }
  private async init(){
        try{
      this.status.set('loading');
      const savedTracks = await this.storage.getAllTracks();
      this.trackSignal.set(savedTracks);
      this.status.set('success');
    }catch(error){
      this.status.set('error');
      console.error('failed to lead the tracks ', error)

    }
    
  }

  async addTrack(track:Track){
    try{
      const id = await this.storage.saveTrack(track);
      const newTrack = { ...track, id};
      this.trackSignal.update(currentTracks=> [...currentTracks,newTrack]);
      return id ;
    }catch(error){
      console.error('error adding track',error);
      throw error
    }

  }

  async deleteTrack(id:number){
    try{
      await this.storage.deleteTrack(id);
      this.trackSignal.update(currentTracks => currentTracks.filter(track=>track.id != id));
    }catch(error){
      console.log('the track was not deleted',error)
    }
  }



  
}

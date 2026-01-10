import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Track } from '../modules/track/track-module';

@Injectable({
  providedIn: 'root',
})
export class StorageService extends Dexie {

  tracks!:Table<Track>;
  constructor(){

    super('MusicStreamDB')

    this.version(1).stores({
      tracks:'++id , title , artist , category '
    })
  }

  async saveTrack(track:Track):Promise<number>{
    return await this.tracks.add(track);
  }

  async getAllTracks():Promise<Track[]>{
    return await this.tracks.toArray();
  }
  async deleteTrack(id:number):Promise<void>{
    await this.tracks.delete(id);
  }
  async updateTrack(track:Track){
    return await this.tracks.put(track)
  }

    

  
}

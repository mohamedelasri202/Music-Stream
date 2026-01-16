import { Component, effect, inject, signal } from '@angular/core';
import { AddTrack } from '../add-track/add-track';
import { TrackService } from '../../services/track-service';
import { StorageService } from '../../services/storage-service';
import { UntypedFormBuilder } from '@angular/forms';

import { Track } from '../../modules/track/track-module';
import { Button } from '../../shared/components/button/button';
import { CommonModule } from '@angular/common';
import { AudioPlayerService } from '../../services/audio-player-service';
import { RouterModule } from '@angular/router';
import { FilterMenu } from '../../shared/components/filter-menu/filter-menu';
import { UiService } from '../../services/ui-service';

@Component({
  selector: 'app-library',
  imports: [AddTrack, CommonModule, RouterModule, FilterMenu],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library {
  filteredTracks = signal<Track[]>([]);
  trackService = inject(TrackService)
  private audioService = inject(AudioPlayerService);
  isMenuOpen = signal(false)
  currentSort = 'Date Added';
  tracks = this.trackService.tracks
  selectedTrack: Track | null = null;
  isFormVisible: boolean = false;
  private uiService =inject(UiService)

  constructor() {
 effect(() => {
    const term = this.uiService.searchQuery();
    console.log('Search term received in Library:', term);
    this.applyFilter(term);
  });
}

  onSortChange(option: string) {
  this.currentSort = option;
  this.isMenuOpen.set(false);

  if (option === 'Title') {
   
    const sorted = [...this.filteredTracks()].sort((a, b) => 
      a.title.localeCompare(b.title)
    );
  
    this.filteredTracks.set(sorted);
  }
}

  deleteTrack(id: number | undefined) {
    console.log('Delete button clicked for ID:', id);
    if (!id) return;
    this.trackService.deleteTrack(id);
  }
  async updateTrack(track: Track) {

    this.selectedTrack = track
    this.isFormVisible = true;


    window.scrollTo({ top: 0, behavior: 'smooth' })

  }

  togleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  playTrack(track: Track) {
    this.audioService.loadTrack(track);
  }

  toggleFilterMenu() {
    this.isMenuOpen.update(value => !value);
  }

applyFilter(searchTerm: string) {
  const allTracks = this.trackService.tracks();
  console.log('1. All Tracks:', allTracks.length); // How many tracks do we start with?

  const results = allTracks.filter(track => {
    const match = track.title.toLowerCase().includes(searchTerm.toLowerCase());
    return match;
  });

  console.log('2. Filtered Results:', results.length); // How many tracks survived the filter?
  
  this.filteredTracks.set(results);
}

  ngOnInit(){
    this.uiService.setSearchVisibility(true)
  }
  ngOnDestory(){
    this.uiService.setSearchVisibility(false)
  }



}




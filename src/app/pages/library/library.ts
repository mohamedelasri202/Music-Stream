import { Component, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-library',
  imports: [AddTrack, CommonModule, RouterModule, FilterMenu],
  templateUrl: './library.html',
  styleUrl: './library.css',
})
export class Library {
  trackService = inject(TrackService)
  private audioService = inject(AudioPlayerService);
  isMenuOpen = signal(false)
  currentSort = 'Date Added';
  tracks = this.trackService.tracks
  selectedTrack: Track | null = null;
  isFormVisible: boolean = false;

  onSortChange(option: string) {
    this.currentSort = option;
    this.isMenuOpen.set(false);
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



}




import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../../services/track-service';
import { UiService } from '../../services/ui-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
})
export class TrackDetail {
  private route = inject(ActivatedRoute);
  private trackService = inject(TrackService);
  private uiService = inject(UiService);

  ngOnInit() {
    this.uiService.setSearchVisibility(false);
  }

  track = computed(() => {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return this.trackService.tracks().find(t => t.id === id);
  });
}

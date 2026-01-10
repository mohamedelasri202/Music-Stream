import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrackService } from '../../services/track-service';
import { Track } from '../../modules/track/track-module';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-add-track',
  standalone: true, // Ensuring it's standalone if not in a module
  imports: [CommonModule, ReactiveFormsModule,Button],
  templateUrl: './add-track.html',
  styleUrl: './add-track.css',
})
export class AddTrack implements OnInit {
  private fb = inject(FormBuilder);
  private trackService = inject(TrackService);

  // --- Data Storage ---
  // The private variable that actually holds the track data
  private _trackToEdit: Track | null = null;

  // The "Front Door" (Setter)
  @Input() set trackToEdit(value: Track | null) {
    this._trackToEdit = value;
    if (value) {
      // If we get a track, fill the form automatically
      this.trackForm.patchValue(value);
    } else {
      // If we get null, clear the form for a new entry
      this.trackForm.reset({ category: 'pop' });
    }
  }

  // The "Back Door" (Getter)
  get trackToEdit(): Track | null {
    return this._trackToEdit;
  }

  // --- Form Properties ---
  trackForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;

  constructor() {
    // Initialize the form structure
    this.trackForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      artist: ['', [Validators.required]],
      category: ['pop', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    // Logic moved to Setter (trackToEdit) to handle real-time updates
  }

  // --- Methods ---

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        this.fileError = "File is too large (Max 10MB)";
        this.selectedFile = null;
      } else {
        this.fileError = null;
        this.selectedFile = file;
      }
    }
  }

  async onSubmit() {
    // File is ready if we are EDITING (already has a file) OR we just UPLOADED one
    const isFileReady = this.trackToEdit || this.selectedFile;

    if (this.trackForm.valid && isFileReady) {
      const trackData: Track = {
        ...this.trackForm.value,
        // Fallback to existing file if a new one wasn't picked during edit
        file: this.selectedFile || this.trackToEdit?.file,
        addedAt: this.trackToEdit ? this.trackToEdit.addedAt : new Date(),
        duration: 0
      };

      try {
        if (this.trackToEdit) {
          // MODE: UPDATE
          trackData.id = this.trackToEdit.id;
          await this.trackService.updateTrack(trackData);
          console.log('Update successful');
        } else {
          // MODE: ADD
          await this.trackService.addTrack(trackData);
          console.log('Save successful');
        }

        // --- Post-Save Cleanup ---
        this.trackForm.reset({ category: 'pop' });
        this.selectedFile = null;
        this._trackToEdit = null; // Exit edit mode

      } catch (error) {
        console.error('Operation failed:', error);
      }
    } else {
      console.log('Form check failed:', this.trackForm.valid, 'File ready:', isFileReady);
    }
  }
}
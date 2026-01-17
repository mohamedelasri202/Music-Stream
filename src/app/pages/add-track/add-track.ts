import { Component, inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrackService } from '../../services/track-service';
import { Track } from '../../modules/track/track-module';
import { Button } from '../../shared/components/button/button';
import { audit } from 'rxjs';

@Component({
  selector: 'app-add-track',
  standalone: true, // Ensuring it's standalone if not in a module
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './add-track.html',
  styleUrl: './add-track.css',
})
export class AddTrack implements OnInit {
  private fb = inject(FormBuilder);
  private trackService = inject(TrackService);

  @Output() closeForm = new EventEmitter<void>();

  trackDuration: string = '';


  private _trackToEdit: Track | null = null;

  onClose() {
    this.closeForm.emit();
  }


  @Input() set trackToEdit(value: Track | null) {
    this._trackToEdit = value;
    if (value) {

      this.trackForm.patchValue(value);
      this.trackDuration = value.duration || ''
    } else {
     
      this.trackForm.reset({ category: 'pop' });
    }
  }

 
  get trackToEdit(): Track | null {
    return this._trackToEdit;
  }

  trackForm: FormGroup;
  selectedFile: File | null = null;
  fileError: string | null = null;

  constructor() {

    this.trackForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50), this.noWhitespaceValidator, this.specialCharValidator]],
      artist: ['', [Validators.required, this.noWhitespaceValidator, this.specialCharValidator]],
      category: ['pop', [Validators.required]],
      description: ['', [Validators.maxLength(200)]]
    });
  }


  noWhitespaceValidator(control: any) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


  specialCharValidator(control: any) {
    if (!control.value) return null;
 
    const validRegex = /^[a-zA-Z0-9\s\u00C0-\u017F\.,'?!(\)\-]+$/;
    const isValid = validRegex.test(control.value);
    return isValid ? null : { 'specialChar': true };
  }

  ngOnInit(): void {
   
  }

  

  isSubmitting = false;
  submissionError: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileError = null;
      this.selectedFile = null;

      if (file.size > 10 * 1024 * 1024) {
        this.fileError = "File is too large (Max 10MB)";
        return;
      }

     
      const validTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3'];
      if (!validTypes.includes(file.type)) {
        this.fileError = "Invalid format. Only MP3, WAV, and OGG are allowed.";
        return;
      }

      this.selectedFile = file;
      const objectUrl = URL.createObjectURL(file);
      const audio = new Audio();
      audio.src = objectUrl;

      audio.onloadedmetadata = () => {
        const seconds = audio.duration;
        this.trackDuration = this.formatDurationTime(seconds)
        URL.revokeObjectURL(objectUrl)
      }

      audio.onerror = () => {
        this.fileError = "Could not load audio file. It might be corrupted.";
        this.selectedFile = null;
      }
    }
  }

  formatDurationTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  async onSubmit() {
    this.submissionError = null;
    const isFileReady = this.trackToEdit || this.selectedFile;

    if (this.trackForm.valid && isFileReady) {
      this.isSubmitting = true;

      const trackData: Track = {
        ...this.trackForm.value,
        file: this.selectedFile || this.trackToEdit?.file,
        addedAt: this.trackToEdit ? this.trackToEdit.addedAt : new Date(),
        duration: this.trackDuration
      };

      try {
        if (this.trackToEdit) {
          trackData.id = this.trackToEdit.id;
          await this.trackService.updateTrack(trackData);
        } else {
          await this.trackService.addTrack(trackData);
        }

        this.onClose(); 
        this.trackForm.reset({ category: 'pop' });
        this.selectedFile = null;
        this._trackToEdit = null;

      } catch (error) {
        console.error('Operation failed:', error);
        this.submissionError = "Failed to save track. Please try again.";
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.trackForm.markAllAsTouched(); 
    }
  }


}
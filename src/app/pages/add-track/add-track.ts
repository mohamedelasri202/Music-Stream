import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrackService } from '../../services/track-service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Track } from '../../modules/track/track-module';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-track',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-track.html',
  styleUrl: './add-track.css',
})
export class AddTrack implements OnInit {
  private fb = inject(FormBuilder);
  private  trackService = inject(TrackService)
  @Input() trackToIdit:Track | null =null;

  trackForm :FormGroup;
  selectedFile:File| null  = null ;
  fileError:string | null = null ;
  constructor(){
    this.trackForm = this.fb.group({
      title :['',[Validators.required ,Validators.maxLength(50)]],
      artist :['',[Validators.required]],
      category :['',[Validators.required]],
      description:['',[Validators.maxLength(200)]]

    });
    }


    ngOnInit(): void {
      if(this.trackToIdit){
        this.trackForm.patchValue(this.trackToIdit);
      }
    }

onFileSelected(event: any) {
  // console.log('File selection triggered!', event); 
  const file = event.target.files[0];
  
  if (file) {
    // console.log('File detected:', file.name, file.size); 
    
    
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
  // console.log('Upload button clicked!'); 

  if (this.trackForm.valid && this.selectedFile) {
    try {
      const newTrack: Track = {
        ...this.trackForm.value,
        file: this.selectedFile,
        addedAt: new Date(),
        duration: 0 
      };

      // console.log('Attempting to save track...', newTrack);
      await this.trackService.addTrack(newTrack);
      
      // console.log('Save successful!');
      this.trackForm.reset({ category: 'pop' });
      this.selectedFile = null;
    } catch (error) {
      console.error('Error during upload:', error);
    }
  } else {
    console.log('Form check failed:', this.trackForm.valid, this.selectedFile);
  }
}
  

}

import { Component, inject } from '@angular/core';
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
export class AddTrack {
  private fb = inject[FormBuilder];
  private  trackService = inject[TrackService]

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

    onFileSelected(event :any){
      const file = event.target.file[0];
      if(file){
        if(file.size>10*1024*1024){
          this.fileError ="File is too large (max 10MB)";
          this.selectedFile = null 
        }else{
          this.fileError = null
          this.selectedFile = file;
        }
      }
    }

    async onSubmit (){
      
    }
  

}

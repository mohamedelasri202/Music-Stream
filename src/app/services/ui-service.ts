import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  showSearchBar = signal(false);

  setSearchVisibility(isVisible:boolean){
    this.showSearchBar.set(isVisible)

  }
  
}

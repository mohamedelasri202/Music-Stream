import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  showSearchBar = signal(false);
  searchQuery =signal('')

  setSearchVisibility(isVisible:boolean){
    this.showSearchBar.set(isVisible)

  }

  updateSearch(text:string){
    this.searchQuery.set(text)
  }  
}

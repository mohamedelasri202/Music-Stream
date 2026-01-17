import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public uiService = inject(UiService)
}

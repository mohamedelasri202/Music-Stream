import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui-service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
    public uiService = inject(UiService)
}

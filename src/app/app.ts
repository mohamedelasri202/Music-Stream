import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";
import { PlayerControls } from './components/player-controls/player-controls';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,PlayerControls],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MusicStream');
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Navbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  /** Texto de la marca que se muestra junto al logo. */
  protected readonly title = 'TP Front Angular';
}

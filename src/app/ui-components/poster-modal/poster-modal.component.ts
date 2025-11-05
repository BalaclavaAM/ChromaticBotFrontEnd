import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-poster-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './poster-modal.component.html',
  styleUrls: ['./poster-modal.component.sass']
})
export class PosterModalComponent {
  @Input() posterUrl!: string;
  @Input() userName!: string;
  canShare: boolean = false;

  constructor(public activeModal: NgbActiveModal) {
    // Verificar si el navegador soporta Web Share API
    this.canShare = 'share' in navigator && 'canShare' in navigator;
  }

  async share(): Promise<void> {
    if (!this.canShare) {
      alert('Tu navegador no soporta la función de compartir');
      return;
    }

    try {
      // Convertir base64 a blob
      const blob = await (await fetch(this.posterUrl)).blob();
      const file = new File([blob], 'mi-paleta-cromatica.png', { type: 'image/png' });

      // Verificar si se puede compartir el archivo
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Mi Paleta Cromática',
          text: `Mira mi análisis cromático de Spotify! - @${this.userName}`,
          files: [file]
        });
      } else {
        // Fallback: compartir solo el texto
        await navigator.share({
          title: 'Mi Paleta Cromática',
          text: `Mira mi análisis cromático de Spotify! - @${this.userName}`
        });
      }
    } catch (error: any) {
      // El usuario canceló o hubo un error
      if (error.name !== 'AbortError') {
        console.error('Error compartiendo:', error);
      }
    }
  }
}

import { Injectable } from '@angular/core';
import { SpotifyTopInfo } from '../models/spotifyTopInfo';

export interface PosterOptions {
  title: string;
  subtitle: string;
  backgroundStyle: string;
}

@Injectable({
  providedIn: 'root'
})
export class PosterGeneratorService {
  // Dimensiones del póster (formato Instagram Stories)
  private readonly WIDTH = 1080;
  private readonly HEIGHT = 1920;

  // Layout
  private readonly MARGIN = 84;
  private readonly GRID_TOP = 420;
  private readonly GRID_BOTTOM = 1790;
  private readonly GAP = 24;
  private readonly CARD_PAD = 10;
  private readonly PALETTE_H = 18;
  private readonly MAX_ALBUMS = 24;

  private readonly SPECTRUM = ['#FF5340', '#FFAE33', '#F5E13F', '#3FD974', '#37C8F0', '#7A63FF', '#E45CFF'];

  async generatePoster(albums: SpotifyTopInfo[], options: PosterOptions): Promise<string> {
    const canvas = document.createElement('canvas');
    canvas.width = this.WIDTH;
    canvas.height = this.HEIGHT;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No se pudo crear el contexto del canvas');
    }

    // Asegurar que Syne/Roboto Mono estén disponibles para el canvas
    await document.fonts.ready;

    const isLight = this.isLightBackground(options.backgroundStyle);
    const shown = albums.slice(0, this.MAX_ALBUMS);

    this.drawBackground(ctx, options.backgroundStyle);
    this.drawHeader(ctx, options.title, options.subtitle, isLight);
    this.drawSpectrumStrip(ctx, shown);

    const images = await this.loadAllImages(shown);
    this.drawAlbumsGrid(ctx, shown, images, options.backgroundStyle);
    this.drawFooter(ctx, isLight);

    return canvas.toDataURL('image/png');
  }

  private isLightBackground(style: string): boolean {
    return style === 'solid-white' || style === 'gradient-sunset';
  }

  private textColor(isLight: boolean): string {
    return isLight ? '#14111A' : '#F4F1EC';
  }

  private mutedColor(isLight: boolean): string {
    return isLight ? 'rgba(20, 17, 26, 0.62)' : 'rgba(244, 241, 236, 0.72)';
  }

  private cardBacking(style: string): string {
    if (style === 'solid-white') {
      return 'rgba(0, 0, 0, 0.05)';
    }
    if (style === 'gradient-sunset') {
      return 'rgba(255, 255, 255, 0.38)';
    }
    return 'rgba(8, 6, 12, 0.32)';
  }

  private roundedPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  private drawBackground(ctx: CanvasRenderingContext2D, backgroundStyle: string): void {
    const gradientOf = (stops: Array<[number, string]>) => {
      const gradient = ctx.createLinearGradient(0, 0, 0, this.HEIGHT);
      stops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
      return gradient;
    };

    switch (backgroundStyle) {
      case 'gradient-spotify':
        ctx.fillStyle = gradientOf([[0, '#1DB954'], [1, '#191414']]);
        break;
      case 'gradient-sunset':
        ctx.fillStyle = gradientOf([[0, '#FF6B6B'], [0.5, '#FFD93D'], [1, '#6BCF7F']]);
        break;
      case 'gradient-ocean':
        ctx.fillStyle = gradientOf([[0, '#667eea'], [1, '#764ba2']]);
        break;
      case 'gradient-purple':
        ctx.fillStyle = gradientOf([[0, '#8E2DE2'], [1, '#4A00E0']]);
        break;
      case 'solid-black':
        ctx.fillStyle = '#000000';
        break;
      case 'solid-white':
        ctx.fillStyle = '#FFFFFF';
        break;
      case 'gradient-dark':
      default:
        // Fondo de marca: sala de escucha violácea
        ctx.fillStyle = gradientOf([[0, '#14111A'], [1, '#291F3D']]);
    }

    ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
  }

  private drawBrandDot(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number): void {
    const slice = (Math.PI * 2) / this.SPECTRUM.length;
    this.SPECTRUM.forEach((color, i) => {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, i * slice - Math.PI / 2, (i + 1) * slice - Math.PI / 2);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    });
  }

  private drawHeader(ctx: CanvasRenderingContext2D, title: string, subtitle: string, isLight: boolean): void {
    ctx.textAlign = 'left';

    // Marca
    this.drawBrandDot(ctx, this.MARGIN + 16, 86, 16);
    ctx.fillStyle = this.textColor(isLight);
    ctx.font = "700 38px Syne, Arial, sans-serif";
    ctx.fillText('ChromaticBot', this.MARGIN + 48, 100);

    // Título grande, reduciendo el tamaño hasta que quepa
    const heading = title.toUpperCase();
    let size = 96;
    do {
      ctx.font = `800 ${size}px Syne, Arial, sans-serif`;
      size -= 6;
    } while (ctx.measureText(heading).width > this.WIDTH - 2 * this.MARGIN && size > 48);
    ctx.fillText(heading, this.MARGIN, 250);

    // Subtítulo en mono
    ctx.font = "500 30px 'Roboto Mono', monospace";
    ctx.fillStyle = this.mutedColor(isLight);
    ctx.fillText(subtitle, this.MARGIN, 308);
  }

  // Franja con los colores dominantes reales del usuario
  private drawSpectrumStrip(ctx: CanvasRenderingContext2D, albums: SpotifyTopInfo[]): void {
    if (albums.length === 0) {
      return;
    }
    const y = 348;
    const h = 16;
    const innerW = this.WIDTH - 2 * this.MARGIN;
    const segment = innerW / albums.length;

    ctx.save();
    this.roundedPath(ctx, this.MARGIN, y, innerW, h, 8);
    ctx.clip();
    albums.forEach((album, i) => {
      const [r, g, b] = album.dominant;
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fillRect(this.MARGIN + i * segment, y, segment + 1, h);
    });
    ctx.restore();
  }

  private async loadAllImages(albums: SpotifyTopInfo[]): Promise<HTMLImageElement[]> {
    const imagePromises = albums.map(album => this.loadImageWithCORS(album.image));
    return Promise.all(imagePromises);
  }

  private loadImageWithCORS(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // CRÍTICO para evitar taint del canvas
      img.onload = () => resolve(img);
      img.onerror = (error) => {
        console.error('Error loading image:', url, error);
        // Placeholder en caso de error
        const placeholderImg = new Image();
        placeholderImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgZmlsbD0iIzMzMzMzMyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BbGJ1bTwvdGV4dD48L3N2Zz4=';
        resolve(placeholderImg);
      };
      img.src = url;
    });
  }

  private drawAlbumsGrid(
    ctx: CanvasRenderingContext2D,
    albums: SpotifyTopInfo[],
    images: HTMLImageElement[],
    backgroundStyle: string
  ): void {
    const n = albums.length;
    if (n === 0) {
      return;
    }

    const innerW = this.WIDTH - 2 * this.MARGIN;
    const availH = this.GRID_BOTTOM - this.GRID_TOP;
    const extraH = this.PALETTE_H + 8; // cardH = cardW + paleta + separación

    // Grilla adaptativa: elegir el número de columnas que produce
    // las portadas más grandes dentro del área disponible
    let cols = 4;
    let cardW = 0;
    for (let candidate = 2; candidate <= 4; candidate++) {
      const candidateRows = Math.ceil(n / candidate);
      const fromWidth = (innerW - (candidate - 1) * this.GAP) / candidate;
      const fromHeight = (availH - (candidateRows - 1) * this.GAP) / candidateRows - extraH;
      const candidateW = Math.floor(Math.min(fromWidth, fromHeight));
      if (candidateW > cardW) {
        cardW = candidateW;
        cols = candidate;
      }
    }
    const rows = Math.ceil(n / cols);
    const cardH = cardW + extraH;
    const cover = cardW - 2 * this.CARD_PAD;

    const gridW = cols * cardW + (cols - 1) * this.GAP;
    const gridH = rows * cardH + (rows - 1) * this.GAP;
    const startX = (this.WIDTH - gridW) / 2;
    const startY = this.GRID_TOP + (availH - gridH) / 2;

    albums.forEach((album, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      // Centrar la última fila si queda incompleta
      const itemsInRow = row === rows - 1 ? n - row * cols : cols;
      const rowOffset = ((cols - itemsInRow) * (cardW + this.GAP)) / 2;

      const x = startX + rowOffset + col * (cardW + this.GAP);
      const y = startY + row * (cardH + this.GAP);

      // Tarjeta de respaldo con sombra
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
      ctx.shadowBlur = 18;
      ctx.shadowOffsetY = 8;
      this.roundedPath(ctx, x, y, cardW, cardH, 18);
      ctx.fillStyle = this.cardBacking(backgroundStyle);
      ctx.fill();
      ctx.restore();

      // Carátula con esquinas redondeadas
      ctx.save();
      this.roundedPath(ctx, x + this.CARD_PAD, y + this.CARD_PAD, cover, cover, 12);
      ctx.clip();
      ctx.drawImage(images[index], x + this.CARD_PAD, y + this.CARD_PAD, cover, cover);
      ctx.restore();

      // Paleta como chips redondeados
      this.drawColorPalette(ctx, album.colors, x + this.CARD_PAD, y + this.CARD_PAD + cover + 8, cover);
    });
  }

  private drawColorPalette(
    ctx: CanvasRenderingContext2D,
    colors: Array<number[]>,
    x: number,
    y: number,
    width: number
  ): void {
    if (!colors || colors.length === 0) {
      return;
    }
    const colorWidth = width / colors.length;

    ctx.save();
    this.roundedPath(ctx, x, y, width, this.PALETTE_H, 6);
    ctx.clip();
    colors.forEach((color, index) => {
      ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ctx.fillRect(x + index * colorWidth, y, colorWidth + 1, this.PALETTE_H);
    });
    ctx.restore();
  }

  private drawFooter(ctx: CanvasRenderingContext2D, isLight: boolean): void {
    const lineY = 1836;

    ctx.strokeStyle = isLight ? 'rgba(20, 17, 26, 0.15)' : 'rgba(244, 241, 236, 0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.MARGIN, lineY);
    ctx.lineTo(this.WIDTH - this.MARGIN, lineY);
    ctx.stroke();

    ctx.fillStyle = this.mutedColor(isLight);
    ctx.font = "500 24px 'Roboto Mono', monospace";
    ctx.textAlign = 'center';
    ctx.fillText('ChromaticBot · Powered by Spotify', this.WIDTH / 2, lineY + 44);
  }
}

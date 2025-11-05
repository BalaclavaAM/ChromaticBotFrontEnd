import { Injectable } from '@angular/core';
import { SpotifyTopInfo } from '../models/spotifyTopInfo';

@Injectable({
  providedIn: 'root'
})
export class PosterGeneratorService {
  // Dimensiones del póster (Instagram Stories format)
  private readonly POSTER_WIDTH = 1080;
  private readonly POSTER_HEIGHT = 1920;

  // Layout constants
  private readonly HEADER_HEIGHT = 180;
  private readonly ALBUM_SIZE = 240;
  private readonly ALBUMS_PER_ROW = 4;
  private readonly ALBUM_MARGIN = 12;
  private readonly COLOR_BAR_HEIGHT = 24;
  private readonly FOOTER_HEIGHT = 80;

  constructor() { }

  async generatePoster(
    albums: SpotifyTopInfo[],
    userName: string,
    timeRange: string
  ): Promise<string> {
    // Crear canvas offscreen
    const canvas = document.createElement('canvas');
    canvas.width = this.POSTER_WIDTH;
    canvas.height = this.POSTER_HEIGHT;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No se pudo crear el contexto del canvas');
    }

    // Dibujar fondo con degradado
    const gradient = ctx.createLinearGradient(0, 0, 0, this.POSTER_HEIGHT);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#16213e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, this.POSTER_WIDTH, this.POSTER_HEIGHT);

    // Dibujar header
    this.drawHeader(ctx, userName, timeRange);

    // Tomar solo los primeros 16 álbumes (4x4 grid)
    const albumsToShow = albums.slice(0, 16);

    // Cargar todas las imágenes en paralelo
    const loadedImages = await this.loadAllImages(albumsToShow);

    // Dibujar grid de álbumes con sus paletas
    this.drawAlbumsGrid(ctx, albumsToShow, loadedImages);

    // Dibujar footer
    this.drawFooter(ctx);

    // Retornar como base64
    return canvas.toDataURL('image/png');
  }

  private drawHeader(ctx: CanvasRenderingContext2D, userName: string, timeRange: string): void {
    // Título
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CHROMATIC PALETTE', this.POSTER_WIDTH / 2, 70);

    // Usuario
    ctx.font = '32px Arial, sans-serif';
    ctx.fillStyle = '#1DB954';
    ctx.fillText(`@${userName}`, this.POSTER_WIDTH / 2, 115);

    // Rango de tiempo
    ctx.font = '24px Arial, sans-serif';
    ctx.fillStyle = '#999999';
    ctx.fillText(timeRange, this.POSTER_WIDTH / 2, 150);
  }

  private async loadAllImages(albums: SpotifyTopInfo[]): Promise<HTMLImageElement[]> {
    const imagePromises = albums.map(album => this.loadImageWithCORS(album.image));
    return Promise.all(imagePromises);
  }

  private loadImageWithCORS(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous'; // CRÍTICO para evitar taint del canvas
      img.onload = () => resolve(img);
      img.onerror = (error) => {
        console.error('Error loading image:', url, error);
        // Crear una imagen placeholder en caso de error
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
    images: HTMLImageElement[]
  ): void {
    const startY = this.HEADER_HEIGHT + 20;
    const gridWidth = this.ALBUMS_PER_ROW * this.ALBUM_SIZE + (this.ALBUMS_PER_ROW - 1) * this.ALBUM_MARGIN;
    const startX = (this.POSTER_WIDTH - gridWidth) / 2;
    const itemHeight = this.ALBUM_SIZE + this.COLOR_BAR_HEIGHT + 8;

    albums.forEach((album, index) => {
      const row = Math.floor(index / this.ALBUMS_PER_ROW);
      const col = index % this.ALBUMS_PER_ROW;

      const x = startX + col * (this.ALBUM_SIZE + this.ALBUM_MARGIN);
      const y = startY + row * (itemHeight + this.ALBUM_MARGIN);

      // Dibujar imagen del álbum con sombra sutil
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      ctx.drawImage(images[index], x, y, this.ALBUM_SIZE, this.ALBUM_SIZE);
      ctx.restore();

      // Dibujar paleta de colores
      this.drawColorPalette(ctx, album.colors, x, y + this.ALBUM_SIZE + 4);
    });
  }

  private drawColorPalette(
    ctx: CanvasRenderingContext2D,
    colors: Array<number[]>,
    x: number,
    y: number
  ): void {
    const colorWidth = this.ALBUM_SIZE / colors.length;

    colors.forEach((color, index) => {
      ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ctx.fillRect(
        x + index * colorWidth,
        y,
        colorWidth,
        this.COLOR_BAR_HEIGHT
      );
    });
  }

  private drawFooter(ctx: CanvasRenderingContext2D): void {
    const footerY = this.POSTER_HEIGHT - this.FOOTER_HEIGHT + 10;

    // Línea decorativa
    ctx.strokeStyle = '#333333';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(150, footerY);
    ctx.lineTo(this.POSTER_WIDTH - 150, footerY);
    ctx.stroke();

    // Texto del footer
    ctx.fillStyle = '#999999';
    ctx.font = '20px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ChromaticBot', this.POSTER_WIDTH / 2, footerY + 35);

    // Powered by Spotify
    ctx.font = '16px Arial, sans-serif';
    ctx.fillStyle = '#666666';
    ctx.fillText('Powered by Spotify', this.POSTER_WIDTH / 2, footerY + 60);
  }
}

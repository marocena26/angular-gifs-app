import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// const GIPHY_API_KEY = 'QRTqQEsNcbSQrq40QT0l0HAcaDLfIcSb';
export class GifsService {
  private _tagsHistory: string[] = [];
  private apiKey: string = 'QRTqQEsNcbSQrq40QT0l0HAcaDLfIcSb';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs';
  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get(`${this.serviceUrl}/search`, { params })
      .subscribe((response) => {
        console.log(response);
      });
  }
}

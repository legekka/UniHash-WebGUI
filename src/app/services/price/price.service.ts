import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { PriceData } from 'src/app/models/price-data';
import { PriceBaseUrl, RigBaseUrl, SocketEndpoint } from '../tokens';
import * as SocketIOClient from 'socket.io-client';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private socket: SocketIOClient.Socket;

  private priceSubject$: Subject<PriceData> = new Subject();
  private priceSource$: Observable<PriceData> = this.priceSubject$.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PriceBaseUrl) private baseUrl: string,
    @Inject(SocketEndpoint) private socketEndpoint: string
  ) {
    this.initSocket();
    this.initPriceSource();
  }

  private initPriceSource(): void {
    this.getCurrentPrice().pipe(
      tap(priceData => this.priceSubject$.next(priceData))
    ).subscribe(priceData => this.priceSubject$.next(priceData));
  }

  private initSocket(): void {
    this.socket = SocketIOClient(this.socketEndpoint);
    this.socket.on('price', price => {
      this.priceSubject$.next(price)
    });
  }

  getCurrentPrice(): Observable<PriceData> {
    return this.http.get<PriceData>(this.baseUrl + '/current');
  }

  getPriceSource(): Observable<PriceData> {
    return this.priceSource$;
  }
}

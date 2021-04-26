import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Rig } from 'src/app/models/rig';
import { RigBaseUrl, SocketEndpoint } from '../tokens';
import * as SocketIOClient from 'socket.io-client';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class RigService {

  private socket: SocketIOClient.Socket;

  private rigsSubject$: Subject<Rig[]> = new Subject();
  private rigsSource$: Observable<Rig[]> = this.rigsSubject$.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(RigBaseUrl) private baseUrl: string,
    @Inject(SocketEndpoint) private socketEndpoint: string
  ) {
    this.initSocket();
  }

  // Initializers

  private initSocket(): void {
    this.socket = io(this.socketEndpoint);
    this.socket.on('rig-snapshot', rigs => this.rigsSubject$.next(rigs));
  }

  // Public methods

  getRigSnapshots(from?: Date): Observable<Rig[]> {
    const params = {};
    if (from != null) {
      params['from'] = from;
    }
    return this.http.get<Rig[]>(this.baseUrl + '/snapshots', { params });
  }

  getRigSnapshotSource(): Observable<Rig[]> {
    return this.rigsSource$;
  }

}

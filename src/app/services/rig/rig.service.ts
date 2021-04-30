import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { Rig } from 'src/app/models/rig';
import { RigBaseUrl, SocketEndpoint } from '../tokens';
import * as SocketIOClient from 'socket.io-client';
// import { io } from 'socket.io-client';
import { RigSnapshot } from 'src/app/models/rig-snapshot';

@Injectable({
  providedIn: 'root'
})
export class RigService {

  private socket: SocketIOClient.Socket;

  private rigsSubject$: Subject<Rig[]> = new Subject();
  private rigsSource$: Observable<Rig[]> = this.rigsSubject$.asObservable();

  private rigsCombineSubject$: Subject<Rig[]> = new Subject();
  private rigsCombineSource$: Observable<Rig[]> = this.rigsCombineSubject$.asObservable();

  private rigs: Rig[];

  constructor(
    private http: HttpClient,
    @Inject(RigBaseUrl) private baseUrl: string,
    @Inject(SocketEndpoint) private socketEndpoint: string
  ) {
    this.initSocket();
    this.initCombineSource();
  }

  // Initializers

  private initSocket(): void {
    this.socket = SocketIOClient(this.socketEndpoint);
    this.socket.on('rig-snapshots', rigs => this.rigsSubject$.next(rigs));
  }

  private initCombineSource(): void {
    this.getRigSnapshots().pipe(
      tap(rigs => {
        this.rigs = rigs;
        this.rigsCombineSubject$.next(this.rigs);
      }),
      switchMap(() => this.rigsSource$),
      tap((rigs: Rig[]) => {
        rigs.forEach(rig => {
          const savedRig = this.rigs.find(t => t.id === rig.id);
          if (savedRig != null) {
            if (savedRig.snapshots.every(t => t.id !== rig.snapshots[0].id))
              savedRig.snapshots.push(rig.snapshots[0]);
          } else {
            this.rigs.push(rig);
          }
        })
      })
    ).subscribe(() => {
      this.rigsCombineSubject$.next(this.rigs);
    });

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

  getRigSnapshotsCombined(): Observable<Rig[]> {
    return this.rigsCombineSource$;
  }

}

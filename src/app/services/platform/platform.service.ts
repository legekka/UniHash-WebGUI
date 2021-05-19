import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlatformService {

  constructor(
    private platform: Platform
  ) { }

  public isDesktop(): boolean {
    return !this.platform.ANDROID && !this.platform.IOS;
  }

}

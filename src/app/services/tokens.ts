import { InjectionToken } from "@angular/core";

export const SocketEndpoint = new InjectionToken<string>('SOCKET_ENDPOINT');

export const RigBaseUrl = new InjectionToken<string>('RIG_BASE_URL');

export const PriceBaseUrl = new InjectionToken<string>('PRICE_BASE_URL');

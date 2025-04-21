import { environment } from '../environments/environment';

export function log(...args: any[]) {
  if (!environment.production) {
    console.log(...args);
  }
}

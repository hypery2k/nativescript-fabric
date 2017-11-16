import { CrashlyticsPlugin } from '.';

let INSTANCE: CrashlyticsPlugin;

export interface Android extends CrashlyticsPlugin { }

export interface IOS extends CrashlyticsPlugin { }

export function getInstance(T: new () => CrashlyticsPlugin): CrashlyticsPlugin {
  if (!INSTANCE) {
    INSTANCE = new T();
  }
  return INSTANCE;
}

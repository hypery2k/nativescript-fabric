import { Observable } from 'data/observable';
import { Fabric } from 'nativescript-fabric';

declare const java: any;

export class HelloWorldModel extends Observable {

  private _counter: number;
  private _message: string;

  constructor() {
    super();
    // Initialize default values.
    this._counter = 42;
    this.updateMessage();
    Fabric.logError({ type: 'end2end' }, 'Just a test');
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange('message', value);
    }
  }

  public onTap() {
    this._counter--;
    this.updateMessage();
    throw new java.lang.RuntimeException("This is a crash!");
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._counter} taps left`;
    }
  }
}

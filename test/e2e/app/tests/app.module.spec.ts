import { inject, TestBed } from '@angular/core/testing';
import * as appSettings from 'application-settings';
import { AppModule } from '../app.module';

describe('TaskDeliverParcelComponent', () => {

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    appSettings.clear();
    TestBed.configureTestingModule({
      providers: [
        AppModule
      ]
    });
  });

  it('should init', inject([AppModule], (app: AppModule) => {
    expect(app).toBeDefined();
  }));

});

import { inject, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

describe('AppModule', () => {

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
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

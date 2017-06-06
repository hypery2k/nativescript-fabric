import { inject, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import { AppComponent } from '../app.component';

xdescribe('AppModule', () => {

  // provide our implementations or mocks to the dependency injector
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppModule
      ]
    });
  });

  it('should init AppComponent', inject([AppComponent], (appComponent: AppComponent) => {
    expect(appComponent).toBeDefined();
  }));

});

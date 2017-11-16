import { Fabric } from 'nativescript-fabric';

describe('Fabric', () => {

  it('should init', () => {
    Fabric.init();
  });
  // see https://github.com/hypery2k/nativescript-fabric/issues/46
  it('should log', () => {
    Fabric.logError({},'msg');
  });

});

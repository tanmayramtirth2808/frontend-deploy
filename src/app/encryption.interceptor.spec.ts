import { TestBed } from '@angular/core/testing';

import { EncryptionInterceptor } from './encryption.interceptor';

describe('EncryptionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EncryptionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EncryptionInterceptor = TestBed.inject(EncryptionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

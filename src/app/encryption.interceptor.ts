import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncryptionService } from './services/encryption.service';

@Injectable()
export class EncryptionInterceptor implements HttpInterceptor {

  constructor(private encryptionService: EncryptionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let encryptedReq = req;
    const isFormData = req.body instanceof FormData;

    if (isFormData) {
      const formData = req.body as FormData;
      const receivedJson: any = {};

      formData.forEach((value, key) => {
        if (!key.toLowerCase().includes('image')) {
          receivedJson[key] = value;
        }
      });

      const encryptedBody = this.encryptionService.encryptData(JSON.stringify(receivedJson));

      const newFormData = new FormData();

      newFormData.append('data', encryptedBody);

      formData.forEach((value, key) => {
        if (key.toLowerCase().includes('image')) {
          newFormData.append(key, value);
        }
      });

      newFormData.forEach((value, key) => {
        console.log(`Key: ${key}, Value: ${value}`);
      });

      encryptedReq = req.clone({
        body: newFormData
      });

    } else {
      const encryptedBody = this.encryptionService.encryptData(req.body);
      encryptedReq = req.clone({
        body: { data: encryptedBody }
      });
    }

    encryptedReq = encryptedReq.clone({
      responseType: 'text'
    });

    return next.handle(encryptedReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const body = event.body;
          console.log("Response body (before decryption):", body);

          if (body && typeof body === 'string') {
            try {
              const decryptedBody = this.encryptionService.decryptData(body);
              console.log("Decrypted body:", decryptedBody);

              try {
                const parsedBody = JSON.parse(decryptedBody);
                return event.clone({ body: parsedBody });
              } catch (parseError) {
                return event.clone({ body: { error: 'Invalid response format' } });
              }
            } catch (decryptionError) {
              return event.clone({ body: { error: 'Decryption failed' } });
            }
          }
        }
        return event;
      })
    );
  }
}

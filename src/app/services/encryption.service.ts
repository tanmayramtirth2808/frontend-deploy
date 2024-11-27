import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey = "Coreco@123";

  constructor() { }

  encryptData(data: any): string
  {
    try
    {
      const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
      return encryptedData;
    }
    catch(error)
    {
      return 'Error in encrypting data';
    }
  }

  decryptData(encryptedData: string): any
  {
    try
    {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    }
    catch(error)
    {
      return 'Error decrypting the data';
    }
  }
}

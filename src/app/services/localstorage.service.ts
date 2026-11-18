import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  setITem(key: string, value: string){
    localStorage.setItem(key, value);
  }
  getITem(key: string): string|null{
    return localStorage.getItem(key);
  }
}
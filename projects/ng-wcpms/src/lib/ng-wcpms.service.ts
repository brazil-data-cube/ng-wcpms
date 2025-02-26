import { Injectable } from '@angular/core';
import api from "./../main"

@Injectable({
  providedIn: 'root'
})
export class NgWcpmsService {

  constructor() { }

  /** base url of BDC-STAC */
  private urlWcpms = (window as { [key: string]: any })["__env"].urlWcpms

  /** Get All Collections */
  public async getCollections() {
    try {
      const urlSuffix = `/list_coverages`;
      const { data } = await api.get(`${this.urlWcpms}${urlSuffix}`);
      return data;
    } catch (_) {}
  }

  /**
   * get Phenometrics
   */
  public async getPhenometrics(query: string) {
    try {
      const urlSuffix = `/phenometrics`;
      const { data } = await api.get(`${this.urlWcpms}${urlSuffix}${query}`);
      return data;
    } catch (_) {}
  }

}

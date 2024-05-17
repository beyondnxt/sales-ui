import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperFunctionService {
  constructor() {}

  getMenuPermissions(totalMenu: any, menuName: any) {
    return totalMenu.find((menu: any) => menu.menuName == menuName);
  }

  removeTableHeaderByKey(headers: any, key: any) {
    const index = headers.findIndex((header: any) => header.key === key);
    if (index !== -1) {
      headers.splice(index, 1);
    }
    return headers;
  }
}

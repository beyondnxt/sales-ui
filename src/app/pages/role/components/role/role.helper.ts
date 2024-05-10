import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RoleHelper {
    mapUserData(serviceData: any) {
        console.log('role-----', serviceData);
        let template: any = [];
        serviceData.forEach((element: any) => {
            const menuAccessPermissions = this.mapPermissions(element.menuAccess);
            template.push({
                name: element?.name ? element.name : '',
                description: element?.description ? element.description : '',
                ...menuAccessPermissions,
                id: element?.id ? element.id : '',
                menuAccess: element?.menuAccess ? element.menuAccess : '',
            });
        });
        return template;
    }

    mapPermissions(menuAccess: any): any {
        const permissions: any = {};
        if (menuAccess) {
            menuAccess.forEach((menu: any) => {
                for (const key in menu) {
                    if (key !== 'permissions') {
                        // const formattedKey = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter
                        // for (const permission in menu[key]) {
                            permissions[`${key}Read`] = menu.permissions.read ? menu.permissions.read : false;
                            permissions[`${key}Write`] = menu.permissions.write ? menu.permissions.write : false;
                            permissions[`${key}Delete`] = menu.permissions.delete ? menu.permissions.delete : false;
                        // }
                    } else {
                        for (const permission in menu[key]) {
                            permissions[`${key}Read`] = permissions.read ? permissions.read : false;
                            permissions[`${key}Write`] = permissions.Write ? permissions.read : false;
                            permissions[`${key}Delete`] = permissions.delete ? permissions.read : false;
                        }
                    }
                }
            });
        }
        return permissions;
    }

}
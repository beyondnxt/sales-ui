import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class RoleHelper {
    mapUserData(serviceData: any) {
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
            // console.log('25------', menuAccess);
            menuAccess.forEach((menu: any) => {
                // console.log('27--------', menu);
                for (const key in menu) {
                    if (key !== 'permissions') {
                        permissions[`${menu.menuName}IsActive`] = menu.menu_visibility ? menu.menu_visibility : false;

                        // const formattedKey = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter
                        // for (const permission in menu[key]) {
                            // permissions[`${key}Read`] = menu.permissions.read ? menu.permissions.read : false;
                            permissions[`${menu.menuName}Write`] = menu.permissions.write ? menu.permissions.write : false;
                            permissions[`${menu.menuName}Delete`] = menu.permissions.delete ? menu.permissions.delete : false;
                        // }
                    } else {
                        for (const permission in menu[key]) {
                            // console.log('42----', menu);
                            // permissions[`${key}IsActive`] = menu[key] ? menu[key] : false;
                            // permissions[`${key}Read`] = permissions.read ? permissions.read : false;
                            permissions[`${menu.menuName}Write`] = menu.permissions.write ? menu.permissions.write : false;
                            permissions[`${menu.menuName}Delete`] = menu.permissions.delete ? menu.permissions.delete : false;
                        }
                    }
                }
            });
        }
        // console.log('48-----', permissions);
        return permissions;
    }

}
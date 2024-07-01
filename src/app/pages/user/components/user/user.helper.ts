import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserHelper {
    mapUserData(serviceData: any) {
        let template:any = []
        serviceData.forEach((element: any) => {
            template.push({
                firstName: element?.firstName ? element?.firstName : '',
                lastName:element?.lastName ? element?.lastName : '',
                phoneNumber:element?.phoneNumber ? element?.phoneNumber : '',
                email:element?.email ? element?.email : '',
                id:element?._id ? element._id : '',
                roleId:element?.roleId ? element.roleId : '',
                status:element?.status ? element.status : '',
                password:element?.password ? element.password : '',
             })
        });
        return template;
    }

    exportJsonToExcel(data: any[]): any[] {
        let flattenedData: any[] = [];

        data.forEach((item: any) => {
            flattenedData.push({
                'First Name': item?.firstName ? item?.firstName : '',
                'Last Name':item?.lastName ? item?.lastName : '',
                'Role':item?.roleName ? item?.roleName : '',
                'Phone Number':item?.phoneNumber ? item?.phoneNumber : '',
                'Email':item?.email ? item.email : '',
                'Company':item?.companyName ? item.companyName : '',
                'Created On':item?.createdOn ? item.createdOn : '',
             })
        });
        return flattenedData;
    }
}


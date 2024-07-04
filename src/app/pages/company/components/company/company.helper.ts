import { Injectable } from "@angular/core";
import { format } from "date-fns";

@Injectable({
    providedIn: 'root'
})
export class CompanyHelper {
    mapCompanyData(serviceData: any) {
        let template:any = []
        serviceData.forEach((element: any) => {
            template.push({
                // address: element?.address ? element?.address : '',
                companyName: element?.companyName ? element?.companyName : '',
                createdBy: element?.createdBy ? element?.createdBy : '',
                createdOn: element?.createdOn ? element?.createdOn : '',
                email: element?.email ? element?.email : '',
                id: element?.id ? element?.id : '',
                location: element?.location ? element?.location : '',
                phoneNo: element?.phoneNo ? element?.phoneNo : '',
                updatedBy: element?.updatedBy ? element?.updatedBy : '',
                updatedOn: element?.updatedOn ? element?.updatedOn : '',
                street: element?.address ? element?.address.street : '',
                city: element?.address ? element?.address.city : '',
                zipCode: element?.address ? element?.address.zipCode : '',
                // state: element?.address ? element?.address.state : '',
                country: element?.address ? element?.address.country : '',
                latitude: element?.latitude ? element?.latitude : '',
                longitude: element?.longitude ? element?.longitude : '',
             })
        });
        return template;
    }

    mapBoxData(companyData: any){
        let data: any = {
          address: {}
        };
        Object.assign(data.address, {
          street: companyData.street,
          city: companyData.city,
          zipCode: companyData.zipCode,
          // state: companyData.state,
          country: companyData.country
        });
        data.companyName = companyData.companyName;
        data.email = companyData.email;
        data.phoneNo = companyData.phoneNo;
        data.latitude = companyData.latitude;
        data.longitude = companyData.longitude;
        return data;
      }

      exportJsonToExcel(data: any[]): any[] {
        let flattenedData: any[] = [];

        data.forEach((item: any) => {
          const formattedDate = item?.createdOn ? format(new Date(item.createdOn), 'MMM d, y') : '';

            flattenedData.push({
                'Company Name': item?.companyName ? item?.companyName : '',
                'Email':item?.email ? item?.email : '',
                'Mobile Number':item?.phoneNo ? item?.phoneNo : '',
                'Latitude':item?.latitude ? item?.latitude : '',
                'Longitude':item?.longitude ? item.longitude : '',
                'City':item?.city ? item.city : '',
                'Street':item?.street ? item.street : '',
                'Country':item?.country ? item.country : '',
                'Created Date':formattedDate ? formattedDate : '',
             })
        });
        return flattenedData;
    }
    
}
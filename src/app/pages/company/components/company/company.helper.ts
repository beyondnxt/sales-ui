import { Injectable } from "@angular/core";

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
          country: companyData.country
        });
        data.companyName = companyData.companyName;
        data.email = companyData.email;
        data.phoneNo = companyData.phoneNo;
        data.latitude = companyData.latitude;
        data.longitude = companyData.longitude;
        return data;
      }
}
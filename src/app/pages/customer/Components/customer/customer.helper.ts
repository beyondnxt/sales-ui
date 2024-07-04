import { Injectable } from "@angular/core";
import { format } from "date-fns";

@Injectable({
    providedIn: 'root'
})
export class CustomerHelper {
    
    exportJsonToExcel(data: any[]): any[] {
        let flattenedData: any[] = [];

        data.forEach((item: any) => {
            const formattedDate = item?.createdOn ? format(new Date(item.createdOn), 'MMM d, y') : '';
            flattenedData.push({
                'Company Name': item?.name ? item?.name : '',
                'Email':item?.email ? item?.email : '',
                'Mobile Number':item?.contactNo ? item?.contactNo : '',
                'Contact Person':item?.contactPerson ? item?.contactPerson : '',
                'Latitude':item?.latitude ? item.latitude : '',
                'Longitude':item?.longitude ? item.longitude : '',
                'Country':item?.country ? item.country : '',
                'State':item?.state ? item.state : '',
                'GST Number':item?.gstNumber ? item.gstNumber : '',
                'Created Date':formattedDate ? formattedDate : '',
             })
        });
        return flattenedData;
    }
}


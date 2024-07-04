import { Injectable } from "@angular/core";
import { format } from "date-fns";

@Injectable({
    providedIn: 'root'
})
export class ApproveHelper {
    
    exportJsonToExcel(data: any[]): any[] {
        let flattenedData: any[] = [];

        data.forEach((item: any) => {
            const formattedDate = item?.createdOn ? format(new Date(item.createdOn), 'MMM d, y') : '';

            flattenedData.push({
                'User Name': item?.userName ? item?.userName : '',
                'Date':formattedDate ? formattedDate : '',
                'Check In':item?.punchIn ? item?.punchIn : '',
                'Check In Distance':item?.punchInDistanceFromOffice ? item?.punchInDistanceFromOffice : '',
                'Check Out':item?.punchOut ? item.punchOut : '',
                'Check Out Distance':item?.punchOutDistanceFromOffice ? item.punchOutDistanceFromOffice : '',
                'Status':item?.status ? item.status : '',
             })
        });
        return flattenedData;
    }
}


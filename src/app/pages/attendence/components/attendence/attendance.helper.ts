import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AttendanceHelper {

    exportJsonToExcelAttendance(data: any[]): any[] {
        let flattenedData: any[] = [];

        data.forEach((item: any) => {
            flattenedData.push({
                'User Name': item?.userName ? item?.userName : '',
                'Date':item?.createdOn ? item?.createdOn : '',
                'Check In':item?.punchIn ? item?.punchIn : '',
                'Check In Distance':item?.punchInDistanceFromOffice ? item?.punchInDistanceFromOffice : '',
                'Check Out':item?.punchOut ? item.punchOut : '',
                'Check Out Distance':item?.punchOutDistanceFromOffice ? item.punchOutDistanceFromOffice : '',
                'Status':item?.status ? item.status : '',
             })
        });
        return flattenedData;
    }

    exportJsonToExcelReport(data: any[]): any[] {
        let flattenedData: any[] = [];

        data.forEach((item: any) => {
            flattenedData.push({
                'User Name': item?.userName ? item?.userName : '',
                'Total Present':item?.totalPresent ? item?.totalPresent : '',
                'Total Absent':item?.totalAbsent ? item?.totalAbsent : '',
                'No of irregular punch-ins':item?.totalLatePunchIn ? item?.totalLatePunchIn : '',
                'No of irregular punch-outs':item?.totalEarlyPunchout ? item.totalEarlyPunchout : '',
                'No of unapproved days':item?.totalUnapprovedDays ? item.totalUnapprovedDays : '',
             })
        });
        return flattenedData;
    }
}


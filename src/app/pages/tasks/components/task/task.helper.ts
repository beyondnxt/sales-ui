import { Injectable } from "@angular/core";
import { format } from 'date-fns';

@Injectable({
    providedIn: 'root'
})
export class TaskHelper {

      exportJsonToExcel(data: any[], tab: any): any[] {
        console.log('tab----', tab);
        let flattenedData: any[] = [];

        data.forEach((item: any) => {
          let flattenedItem: any = {};
          const formattedDate = item?.createdOn ? format(new Date(item.createdOn), 'MMM d, y') : '';

          switch (tab) {
              case 'unassigned':
                  flattenedItem = {
                      'Customer Name': item?.customerName || '',
                      'Created By': item?.userName || '',
                      'Task Type': item?.taskType || '',
                      'Assign To': item?.assignToName || '',
                      'Status': item?.status || '',
                      'Description': item?.description || '',
                      'Created On': formattedDate || '',
                      'Follow-up Date': item?.followUpDate || '',
                      // 'Feedback': item?.feedback || '',
                  };
                  break;
  
              case 'assigned':
                  flattenedItem = {
                    'Customer Name': item?.customerName || '',
                    'Created By': item?.userName || '',
                    'Task Type': item?.taskType || '',
                    'Assign To': item?.assignToName || '',
                    'Status': item?.status || '',
                    'Description': item?.description || '',
                    'Created On': formattedDate || '',
                    'Follow-up Date': item?.followUpDate || '',
                    // 'Feedback': item?.feedback || '',
                  };
                  break;
  
              case 'completed':
                  flattenedItem = {
                    'Customer Name': item?.customerName || '',
                    'Created By': item?.userName || '',
                    'Task Type': item?.taskType || '',
                    'Assign To': item?.assignToName || '',
                    'Status': item?.status || '',
                    'Description': item?.description || '',
                    'Created On': formattedDate || '',
                    // 'Follow-up Date': item?.followUpDate || '',
                    // 'Feedback': item?.feedback || '',
                  };
                  break;
  
              case 'verified':
                  flattenedItem = {
                    'Customer Name': item?.customerName || '',
                    'Created By': item?.userName || '',
                    'Task Type': item?.taskType || '',
                    'Assign To': item?.assignToName || '',
                    'Status': item?.status || '',
                    'Description': item?.description || '',
                    'Created On': formattedDate || '',
                    // 'Follow-up Date': item?.followUpDate || '',
                    // 'Feedback': item?.feedback || '',
                  };
                  break;
  
              case 'visit':
                  flattenedItem = {
                    'Customer Name': item?.customerName || '',
                    'Created By': item?.userName || '',
                    // 'Task Type': item?.taskType || '',
                    // 'Assign To': item?.assignToName || '',
                    'Status': item?.status || '',
                    'Description': item?.description || '',
                    'Created On': formattedDate || '',
                    // 'Follow-up Date': item?.followUpDate || '',
                    // 'Feedback': item?.feedback || '',
                  };
                  break;
          }
  
          flattenedData.push(flattenedItem);
      });
  
      return flattenedData;
    }
    
}
import { saveAs } from 'file-saver';
import moment from 'moment';
import * as XLSX from 'xlsx';

export const exportDataToExcel = (data: any[], fileName: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  const date = moment().valueOf();
  saveAs(blob, `${fileName}_${date}.xlsx`);
};

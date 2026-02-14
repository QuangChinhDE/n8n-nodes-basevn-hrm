import * as getPayrollCycles from './getPayrollCycles';
import * as getPayrollRecords from './getPayrollRecords';
import * as getTimesheet from './getTimesheet';
import * as getTimesheets from './getTimesheets';

export { getPayrollCycles, getPayrollRecords, getTimesheet, getTimesheets };

export const description = [
	...getPayrollCycles.description,
	...getPayrollRecords.description,
	...getTimesheet.description,
	...getTimesheets.description,
];

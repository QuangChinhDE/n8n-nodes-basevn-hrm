import * as employee from './employee';
import * as organization from './organization';
import * as employmentInfo from './employmentInfo';
import * as payrollAttendance from './payrollAttendance';
import * as taxInsuranceLegal from './taxInsuranceLegal';
import * as educationRelations from './educationRelations';
import * as merit from './merit';
import * as checkinClient from './checkinClient';

export { employee, organization, employmentInfo, payrollAttendance, taxInsuranceLegal, educationRelations, merit, checkinClient };

export const description = [
	...employee.description,
	...organization.description,
	...employmentInfo.description,
	...payrollAttendance.description,
	...taxInsuranceLegal.description,
	...educationRelations.description,
	...merit.description,
	...checkinClient.description,
];

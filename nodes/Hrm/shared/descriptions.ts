import type { INodeProperties } from 'n8n-workflow';

export const employeeFields: INodeProperties[] = [];
export const organizationFields: INodeProperties[] = [];
export const employmentInfoFields: INodeProperties[] = [];
export const payrollAttendanceFields: INodeProperties[] = [];
export const taxInsuranceLegalFields: INodeProperties[] = [];
export const educationRelationsFields: INodeProperties[] = [];
export const meritFields: INodeProperties[] = [];
export const checkinClientFields: INodeProperties[] = [];

export const description: INodeProperties[] = [
	...employeeFields,
	...organizationFields,
	...employmentInfoFields,
	...payrollAttendanceFields,
	...taxInsuranceLegalFields,
	...educationRelationsFields,
	...meritFields,
	...checkinClientFields,
];

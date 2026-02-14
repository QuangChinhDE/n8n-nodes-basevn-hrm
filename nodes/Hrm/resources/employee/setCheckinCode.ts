import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Employee ID',
		name: 'employee_id',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['employee'], operation: ['setCheckinCode'] } },
		default: '',
		description: 'ID of the employee',
	},
	{
		displayName: 'Office ID',
		name: 'office_id',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['employee'], operation: ['setCheckinCode'] } },
		default: '',
		description: 'Office ID',
	},
	{
		displayName: 'Checkin Code',
		name: 'code',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['employee'], operation: ['setCheckinCode'] } },
		default: '',
		description: 'Checkin code to set',
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const employee_id = this.getNodeParameter('employee_id', index) as string;
	const office_id = this.getNodeParameter('office_id', index) as string;
	const code = this.getNodeParameter('code', index) as string;

	const body = {
		employee_id,
		office_id,
		code,
	};

	const response = await hrmApiRequest.call(this, 'POST', '/employee/checkincode/set', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}

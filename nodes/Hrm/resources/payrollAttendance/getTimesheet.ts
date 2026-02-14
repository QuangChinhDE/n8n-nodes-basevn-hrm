import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Timesheet ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['payrollAttendance'], operation: ['getTimesheet'] } },
		default: '',
		description: 'ID of the timesheet',
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as string;

	const body = {
		id,
	};

	const response = await hrmApiRequest.call(this, 'POST', '/timesheet/get', body);
	const data = processResponse(response);
	return [{ json: Array.isArray(data) ? data[0] : data }];
}

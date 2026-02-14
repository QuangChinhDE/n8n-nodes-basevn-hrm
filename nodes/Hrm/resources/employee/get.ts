import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Employee ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['employee'], operation: ['get'] } },
		default: '',
		description: 'ID of the employee',
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as string;

	const body = {
		id,
	};

	const response = await hrmApiRequest.call(this, 'POST', '/employee/get', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}

import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { buildRequestBody, processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		required: true,
		default: '',
		description: 'Username',
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['remove'],
			},
		},
	},
	{
		displayName: 'Client ID',
		name: 'client_id',
		type: 'string',
		required: true,
		default: '',
		description: 'Checkin client ID to remove',
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['remove'],
			},
		},
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const username = this.getNodeParameter('username', index) as string;
	const client_id = this.getNodeParameter('client_id', index) as string;

	const body = buildRequestBody({
		username,
		client_id,
	});

	const response = await hrmApiRequest.call(this, 'POST', '/checkin.client/remove', body);
	const data = processResponse(response);
	return [{ json: Array.isArray(data) ? data[0] : data }];
}

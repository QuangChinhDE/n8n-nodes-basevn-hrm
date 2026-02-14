import type { IExecuteFunctions, INodeExecutionData, INodeProperties, IDataObject } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { buildRequestBody, processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		description: 'Provide either employee IDs or employee codes',
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['massRemove'],
			},
		},
		options: [
			{
				displayName: 'Employee IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of employee IDs',
			},
			{
				displayName: 'Employee Codes',
				name: 'codes',
				type: 'string',
				default: '',
				description: 'Comma-separated list of employee codes',
			},
		],
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const options = this.getNodeParameter('options', index, {}) as IDataObject;
	const body = buildRequestBody(options);

	const response = await hrmApiRequest.call(this, 'POST', '/employee/mass.remove', body);
	const data = processResponse(response);
	return [{ json: Array.isArray(data) ? data[0] : data }];
}

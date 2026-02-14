import type { IExecuteFunctions, INodeExecutionData, INodeProperties, IDataObject } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { buildRequestBody, processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['getPaginateClients'],
			},
		},
		options: [
			{
				displayName: 'Metatype',
				name: 'metatype',
				type: 'options',
				default: '',
				description: 'Type of checkin client',
				options: [
					{
						name: 'Mobile Checkin',
						value: 'mobile_checkin',
					},
					{
						name: 'Local Machine',
						value: 'local_machine',
					},
					{
						name: 'Web Checkin',
						value: 'web_checkin',
					},
					{
						name: 'WiFi Checkin',
						value: 'wifi_checkin',
					},
					{
						name: 'Cloud Checkin',
						value: 'cloud_checkin',
					},
					{
						name: 'Self Claim',
						value: 'self_claim',
					},
				],
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: '',
				description: 'Client status',
				options: [
					{
						name: 'Inactive',
						value: '0',
					},
					{
						name: 'Active',
						value: '1',
					},
				],
			},
			{
				displayName: 'Items Per Page',
				name: 'items_per_page',
				type: 'number',
				default: 100,
				description: 'Number of items per page',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number (starts from 1)',
			},
		],
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const filters = this.getNodeParameter('filters', index, {}) as IDataObject;
	const body = buildRequestBody(filters);
	const response = await hrmApiRequest.call(this, 'POST', '/checkin.client/list', body);
	const data = processResponse(response);
	return [{ json: Array.isArray(data) ? data[0] : data }];
}

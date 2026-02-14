import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: { resource: ['taxInsuranceLegal'], operation: ['getInsurances'] } },
		options: [
			{
				displayName: 'Updated From',
				name: 'updated_from',
				type: 'number',
				default: 0,
				description: 'Filter by updated from timestamp',
			},
			{
				displayName: 'Updated To',
				name: 'updated_to',
				type: 'number',
				default: 0,
				description: 'Filter by updated to timestamp',
			},
		],
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const filters = this.getNodeParameter('filters', index, {}) as any;
	const body: any = {};

	if (filters.updated_from) body.updated_from = filters.updated_from;
	if (filters.updated_to) body.updated_to = filters.updated_to;

	const response = await hrmApiRequest.call(this, 'POST', '/insurance/list', body);
	const data = processResponse(response);
	return [{ json: Array.isArray(data) ? data[0] : data }];
}

import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['taxInsuranceLegal'], operation: ['getLegals'] } },
		options: [
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 0,
				description: 'Page number for pagination',
			},
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
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;
	const body: any = {};

	if (additionalFields.page !== undefined) body.page = additionalFields.page;
	if (additionalFields.updated_from) body.updated_from = additionalFields.updated_from;
	if (additionalFields.updated_to) body.updated_to = additionalFields.updated_to;

	const response = await hrmApiRequest.call(this, 'POST', '/employee/legals', body);
	const data = processResponse(response);
	return [{ json: Array.isArray(data) ? data[0] : data }];
}

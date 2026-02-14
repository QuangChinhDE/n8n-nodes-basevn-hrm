import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Employee ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['employee'], operation: ['update'] } },
		default: '',
		description: 'ID of the employee',
	},
	{
		displayName: 'Creator',
		name: 'creator',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['employee'], operation: ['update'] } },
		default: '',
		description: 'Username of the updater',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['employee'], operation: ['update'] } },
		options: [
			{
				displayName: 'First Name',
				name: 'first_name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Last Name',
				name: 'last_name',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Employee Code',
				name: 'code',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Gender',
				name: 'gender',
				type: 'options',
				options: [
					{ name: 'Male', value: 'male' },
					{ name: 'Female', value: 'female' },
					{ name: 'Other', value: 'other' },
				],
				default: 'male',
			},
			{
				displayName: 'Employee Type ID',
				name: 'employee_type_id',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Position ID',
				name: 'position_id',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Office ID',
				name: 'office_id',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Team ID',
				name: 'team_id',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'string',
				default: '',
				placeholder: '2024-01-01',
			},
			{
				displayName: 'Official Start Date',
				name: 'official_start_date',
				type: 'string',
				default: '',
				placeholder: '2024-01-01',
			},
		],
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const id = this.getNodeParameter('id', index) as string;
	const creator = this.getNodeParameter('creator', index) as string;
	const updateFields = this.getNodeParameter('updateFields', index, {}) as any;

	const body: any = {
		id,
		creator,
		...updateFields,
	};

	const response = await hrmApiRequest.call(this, 'POST', '/employee/edit', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}

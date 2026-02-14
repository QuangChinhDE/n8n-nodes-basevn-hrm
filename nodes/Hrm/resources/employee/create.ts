import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [
	{
		displayName: 'Creator',
		name: 'creator',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Username of the creator',
	},
	{
		displayName: 'First Name',
		name: 'first_name',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Employee first name',
	},
	{
		displayName: 'Last Name',
		name: 'last_name',
		type: 'string',
		required: true,
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Employee last name',
	},
	{
		displayName: 'Employee Code',
		name: 'code',
		type: 'string',
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Employee code',
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
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: 'male',
		description: 'Employee gender',
	},
	{
		displayName: 'Employee Type ID',
		name: 'employee_type_id',
		type: 'string',
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Employee type ID',
	},
	{
		displayName: 'Position ID',
		name: 'position_id',
		type: 'string',
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Position ID',
	},
	{
		displayName: 'Office ID',
		name: 'office_id',
		type: 'string',
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Office ID',
	},
	{
		displayName: 'Team ID',
		name: 'team_id',
		type: 'string',
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Team ID',
	},
	{
		displayName: 'Start Date',
		name: 'start_date',
		type: 'string',
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Start date (YYYY-MM-DD)',
		placeholder: '2024-01-01',
	},
	{
		displayName: 'Official Start Date',
		name: 'official_start_date',
		type: 'string',
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		default: '',
		description: 'Official start date (YYYY-MM-DD)',
		placeholder: '2024-01-01',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['employee'], operation: ['create'] } },
		options: [
			{
				displayName: 'Salary Info',
				name: 'salaryInfo',
				type: 'fixedCollection',
				default: {},
				options: [
					{
						name: 'values',
						displayName: 'Salary',
						values: [
							{
								displayName: 'Enable Salary Input',
								name: 'salary_input',
								type: 'boolean',
								default: false,
							},
							{
								displayName: 'Salary',
								name: 'salary',
								type: 'number',
								default: 0,
							},
							{
								displayName: 'Basic Salary',
								name: 'basic_salary',
								type: 'number',
								default: 0,
							},
						],
					},
				],
			},
			{
				displayName: 'Legal Info',
				name: 'legalInfo',
				type: 'fixedCollection',
				default: {},
				options: [
					{
						name: 'values',
						displayName: 'Legal',
						values: [
							{
								displayName: 'Enable Legal Input',
								name: 'legal_input',
								type: 'boolean',
								default: false,
							},
							{
								displayName: 'SSN No',
								name: 'ssn_no',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Tax No',
								name: 'tax_no',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Insurance No',
								name: 'inso_no',
								type: 'string',
								default: '',
							},
							{
								displayName: 'Insurance Area',
								name: 'inso_area',
								type: 'string',
								default: '',
							},
						],
					},
				],
			},
		],
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const creator = this.getNodeParameter('creator', index) as string;
	const first_name = this.getNodeParameter('first_name', index) as string;
	const last_name = this.getNodeParameter('last_name', index) as string;
	const code = this.getNodeParameter('code', index, '') as string;
	const gender = this.getNodeParameter('gender', index, '') as string;
	const employee_type_id = this.getNodeParameter('employee_type_id', index, '') as string;
	const position_id = this.getNodeParameter('position_id', index, '') as string;
	const office_id = this.getNodeParameter('office_id', index, '') as string;
	const team_id = this.getNodeParameter('team_id', index, '') as string;
	const start_date = this.getNodeParameter('start_date', index, '') as string;
	const official_start_date = this.getNodeParameter('official_start_date', index, '') as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as any;

	const body: any = {
		creator,
		first_name,
		last_name,
	};

	if (code) body.code = code;
	if (gender) body.gender = gender;
	if (employee_type_id) body.employee_type_id = employee_type_id;
	if (position_id) body.position_id = position_id;
	if (office_id) body.office_id = office_id;
	if (team_id) body.team_id = team_id;
	if (start_date) body.start_date = start_date;
	if (official_start_date) body.official_start_date = official_start_date;

	// Salary info
	if (additionalFields.salaryInfo?.values) {
		const salary = additionalFields.salaryInfo.values;
		if (salary.salary_input) {
			body.salary_input = 1;
			if (salary.salary) body.salary = salary.salary;
			if (salary.basic_salary) body.basic_salary = salary.basic_salary;
		}
	}

	// Legal info
	if (additionalFields.legalInfo?.values) {
		const legal = additionalFields.legalInfo.values;
		if (legal.legal_input) {
			body.legal_input = 1;
			if (legal.ssn_no) body.ssn_no = legal.ssn_no;
			if (legal.tax_no) body.tax_no = legal.tax_no;
			if (legal.inso_no) body.inso_no = legal.inso_no;
			if (legal.inso_area) body.inso_area = legal.inso_area;
		}
	}

	const response = await hrmApiRequest.call(this, 'POST', '/employee/create', body);
	const data = processResponse(response);

	return [{ json: Array.isArray(data) ? data[0] : data }];
}

import type { IExecuteFunctions, INodeExecutionData, INodeProperties, IDataObject } from 'n8n-workflow';
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
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Client ID',
		name: 'client_id',
		type: 'string',
		required: true,
		default: '',
		description: 'Checkin client ID',
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Client name',
			},
			{
				displayName: 'Config IPs',
				name: 'config_ips',
				type: 'string',
				default: '',
				description: 'IP configuration',
			},
			{
				displayName: 'Config Latitude',
				name: 'config_lat',
				type: 'string',
				default: '',
				description: 'GPS latitude',
			},
			{
				displayName: 'Config Longitude',
				name: 'config_lng',
				type: 'string',
				default: '',
				description: 'GPS longitude',
			},
			{
				displayName: 'Config GPS',
				name: 'config_gps',
				type: 'options',
				default: 'no',
				options: [
					{ name: 'Yes', value: 'yes' },
					{ name: 'No', value: 'no' },
				],
				description: 'Enable GPS for mobile checkin',
			},
			{
				displayName: 'Face Detect',
				name: 'face_detect',
				type: 'options',
				default: 'no',
				options: [
					{ name: 'Yes', value: 'yes' },
					{ name: 'No', value: 'no' },
				],
				description: 'Enable face detection',
			},
			{
				displayName: 'Config GPS Only',
				name: 'config_gps_only',
				type: 'options',
				default: 'no',
				options: [
					{ name: 'Yes', value: 'yes' },
					{ name: 'No', value: 'no' },
				],
				description: 'GPS only for mobile checkin',
			},
			{
				displayName: 'Config Radius',
				name: 'config_radius',
				type: 'number',
				default: 50,
				description: 'GPS radius (meters)',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Password for local machine',
			},
			{
				displayName: 'Require Confirm',
				name: 'require_confirm',
				type: 'options',
				default: '0',
				options: [
					{ name: 'No', value: '0' },
					{ name: 'Yes', value: '1' },
				],
				description: 'Require confirmation',
			},
			{
				displayName: 'Confirmed By',
				name: 'confirmed_by',
				type: 'string',
				default: '',
				description: 'User IDs who can confirm',
			},
			{
				displayName: 'Confirmed Flow',
				name: 'confirmed_flow',
				type: 'options',
				default: 'just_one',
				options: [
					{ name: 'Just One', value: 'just_one' },
					{ name: 'Sequential', value: 'sequential' },
				],
				description: 'Confirmation flow type',
			},
			{
				displayName: 'Direct Manager',
				name: 'direct_manager',
				type: 'options',
				default: 'no',
				options: [
					{ name: 'Yes', value: 'yes' },
					{ name: 'No', value: 'no' },
				],
				description: 'Use direct manager',
			},
			{
				displayName: 'SLA',
				name: 'sla',
				type: 'string',
				default: '',
				description: 'SLA configuration',
			},
			{
				displayName: 'Verify Office',
				name: 'verify_office',
				type: 'string',
				default: '',
				description: 'Verify office',
			},
			{
				displayName: 'Verify Timesheet',
				name: 'verify_timesheet',
				type: 'options',
				default: '0',
				options: [
					{ name: 'No', value: '0' },
					{ name: 'Yes', value: '1' },
				],
				description: 'Verify timesheet',
			},
			{
				displayName: 'Exception Users',
				name: 'exception_users',
				type: 'string',
				default: '',
				description: 'Exception user IDs',
			},
			{
				displayName: 'Timesheets',
				name: 'timesheets',
				type: 'string',
				default: '',
				description: 'Timesheet IDs',
			},
			{
				displayName: 'Config WiFi MACs',
				name: 'config_wifi_macs',
				type: 'string',
				default: '',
				description: 'WiFi MAC addresses',
			},
		],
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const username = this.getNodeParameter('username', index) as string;
	const client_id = this.getNodeParameter('client_id', index) as string;
	const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

	const body = buildRequestBody({
		username,
		client_id,
		...updateFields,
	});

	const response = await hrmApiRequest.call(this, 'POST', '/checkin.client/edit', body);
	const data = processResponse(response);
	return [{ json: Array.isArray(data) ? data[0] : data }];
}

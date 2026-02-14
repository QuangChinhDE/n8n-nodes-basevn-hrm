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
		description: 'Creator username',
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Metatype',
		name: 'metatype',
		type: 'options',
		required: true,
		default: 'mobile_checkin',
		description: 'Type of checkin client',
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['create'],
			},
		},
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
				name: 'Self Claim',
				value: 'self_claim',
			},
			{
				name: 'WiFi Checkin',
				value: 'wifi_checkin',
			},
			{
				name: 'Cloud Checkin',
				value: 'cloud_checkin',
			},
		],
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		description: 'Client name',
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['checkinClient'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Office ID',
				name: 'office_id',
				type: 'string',
				default: '',
				description: 'Office ID',
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
				displayName: 'Config Radius',
				name: 'config_radius',
				type: 'number',
				default: 50,
				description: 'GPS radius (meters)',
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
				displayName: 'Config WiFi MACs',
				name: 'config_wifi_macs',
				type: 'string',
				default: '',
				description: 'WiFi MAC addresses (required for wifi_checkin)',
			},
			{
				displayName: 'Password',
				name: 'password',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Password (required for local_machine)',
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
				description: 'Require confirmation for self claim',
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
				description: 'Use direct manager for confirmation',
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
				displayName: 'Timesheets',
				name: 'timesheets',
				type: 'string',
				default: '',
				description: 'Timesheet IDs (required if verify_timesheet=1)',
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
				displayName: 'Exception Users',
				name: 'exception_users',
				type: 'string',
				default: '',
				description: 'Exception user IDs',
			},
		],
	},
];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
	const username = this.getNodeParameter('username', index) as string;
	const metatype = this.getNodeParameter('metatype', index) as string;
	const name = this.getNodeParameter('name', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const body = buildRequestBody({
		username,
		metatype,
		name,
		...additionalFields,
	});

	const response = await hrmApiRequest.call(this, 'POST', '/checkin.client/create', body);
	const data = processResponse(response);
	return [{ json: Array.isArray(data) ? data[0] : data }];
}

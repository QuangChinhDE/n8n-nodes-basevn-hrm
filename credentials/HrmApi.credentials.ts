import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class HrmApi implements ICredentialType {
	name = 'hrmApi';

	displayName = 'HRM API';

	documentationUrl = 'https://hrm.basevn.com/extapi/v1';

	properties: INodeProperties[] = [
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: '',
			placeholder: 'https://hrm.yourdomain.com/extapi/v1',
			required: true,
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				access_token_v2: '={{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.domain}}',
			url: '/employee/list',
			method: 'POST',
		},
	};
}

import type {
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IDataObject,
} from 'n8n-workflow';

export class HrmTrigger implements INodeType {
	usableAsTool = true;

	description: INodeTypeDescription = {
		displayName: 'BaseVN - App HRM Trigger',
		name: 'hrmTrigger',
		icon: 'file:../../icons/hrm.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when BaseVN HRM webhook events occur',
		defaults: {
			name: 'BaseVN HRM Trigger',
		},
		inputs: [],
		outputs: ['main'],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: '={{$parameter["path"]}}',
			},
		],
		properties: [
			{
				displayName: 'Webhook Path',
				name: 'path',
				type: 'string',
				default: 'webhook',
				required: true,
				placeholder: 'webhook',
				description: 'The path for the webhook URL. Leave as default or customize it.',
			},
			{
				displayName: 'Response Selector',
				name: 'responseSelector',
				type: 'options',
				options: [
					{
						name: 'Full Payload',
						value: '',
						description: 'Return complete webhook payload',
					},
					{
						name: 'Body Only',
						value: 'body',
						description: 'Return only the body data',
					},
					{
						name: 'Employee Info',
						value: 'employeeInfo',
						description: 'Return simplified employee information',
					},
				],
				default: 'body',
				description: 'Select which data to return from webhook',
			},
		],
		usableAsTool: true,
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const responseSelector = this.getNodeParameter('responseSelector', '') as string;

		// Process response based on selector
		let returnData: IDataObject = bodyData;

		if (responseSelector === 'employeeInfo') {
			// Return simplified employee information
			returnData = {
				id: bodyData.id,
				employee_code: bodyData.employee_code,
				employee_name: bodyData.employee_name,
				email: bodyData.email,
				phone: bodyData.phone,
				department: bodyData.department,
				position: bodyData.position,
				status: bodyData.status,
				join_date: bodyData.join_date,
				created_at: bodyData.created_at,
				updated_at: bodyData.updated_at,
				link: bodyData.link,
			};
		} else if (responseSelector === '') {
			// Return full payload including headers
			const headerData = this.getHeaderData();
			returnData = {
				headers: headerData,
				body: bodyData,
			};
		}
		// else: Return body only (default) - returnData is already bodyData

		return {
			workflowData: [this.helpers.returnJsonArray(returnData)],
		};
	}
}

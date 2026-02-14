import type { IDataObject } from 'n8n-workflow';

export function buildRequestBody(params: Record<string, any>): Record<string, any> {
	const body: Record<string, any> = {};
	
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== null && value !== '') {
			body[key] = value;
		}
	}
	
	return body;
}

export function processResponse(response: IDataObject): IDataObject | IDataObject[] {
	if (response.code === 1 && response.data) {
		return response.data as IDataObject | IDataObject[];
	}
	return response;
}

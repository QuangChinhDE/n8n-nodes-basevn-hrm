import type { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { hrmApiRequest } from '../../shared/transport';
import { processResponse } from '../../shared/utils';

export const description: INodeProperties[] = [];

export async function execute(this: IExecuteFunctions, index: number): Promise<INodeExecutionData[]> {
const response = await hrmApiRequest.call(this, 'POST', '/timesheet/list', {});
const data = processResponse(response);
return [{ json: Array.isArray(data) ? data[0] : data }];
}

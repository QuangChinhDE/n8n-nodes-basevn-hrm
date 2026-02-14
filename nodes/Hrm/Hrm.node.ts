import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import {
	employee,
	organization,
	employmentInfo,
	payrollAttendance,
	taxInsuranceLegal,
	educationRelations,
	merit,
	checkinClient,
	description,
} from './resources';

export class Hrm implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BaseVN - App HRM',
		name: 'hrm',
		icon: 'file:../../icons/hrm.svg',
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with BaseVN HRM API',
		defaults: {
			name: 'BaseVN - App HRM',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'hrmApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.domain}}',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Checkin Client',
						value: 'checkinClient',
					},
					{
						name: 'Education & Relations',
						value: 'educationRelations',
					},
					{
						name: 'Employee',
						value: 'employee',
					},
					{
						name: 'Employment Info',
						value: 'employmentInfo',
					},
					{
						name: 'Merit / Performance',
						value: 'merit',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Payroll & Attendance',
						value: 'payrollAttendance',
					},
					{
						name: 'Tax, Insurance & Legal',
						value: 'taxInsuranceLegal',
					},
				],
				default: 'employee',
			},
			// Employee operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['employee'],
					},
				},
				options: [
					{ name: 'Create', value: 'create', action: 'Create employee' },
					{ name: 'Get', value: 'get', action: 'Get an employee' },
					{ name: 'Get All', value: 'getAll', action: 'Get all employees' },
					{ name: 'Set Checkin Code', value: 'setCheckinCode', action: 'Set checkin code' },
					{ name: 'Update', value: 'update', action: 'Update employee' },
				],
				default: 'getAll',
			},
			// Organization operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['organization'],
					},
				},
				options: [
					{ name: 'Get Areas', value: 'getAreas', action: 'Get all areas' },
					{ name: 'Get Offices', value: 'getOffices', action: 'Get all offices' },
					{ name: 'Get Positions', value: 'getPositions', action: 'Get all positions' },
					{ name: 'Get Position Types', value: 'getPositionTypes', action: 'Get position types' },
					{ name: 'Get Teams', value: 'getTeams', action: 'Get all teams' },
				],
				default: 'getAreas',
			},
			// Employment Info operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['employmentInfo'],
					},
				},
				options: [
					{ name: 'Get Career Records', value: 'getCareerRecords', action: 'Get career records' },
					{ name: 'Get Contracts', value: 'getContracts', action: 'Get contracts' },
					{ name: 'Get Contract Types', value: 'getContractTypes', action: 'Get contract types' },
					{ name: 'Get Employee Types', value: 'getEmployeeTypes', action: 'Get employee types' },
					{ name: 'Get Work Histories', value: 'getWorkHistories', action: 'Get work histories' },
				],
				default: 'getEmployeeTypes',
			},
			// Payroll & Attendance operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['payrollAttendance'],
					},
				},
				options: [
					{ name: 'Get Payroll Cycles', value: 'getPayrollCycles', action: 'Get payroll cycles' },
					{ name: 'Get Payroll Records', value: 'getPayrollRecords', action: 'Get payroll records' },
					{ name: 'Get Timesheet', value: 'getTimesheet', action: 'Get timesheet' },
					{ name: 'Get Timesheets', value: 'getTimesheets', action: 'Get timesheets' },
				],
				default: 'getPayrollCycles',
			},
			// Tax, Insurance & Legal operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['taxInsuranceLegal'],
					},
				},
				options: [
					{ name: 'Get Insurances', value: 'getInsurances', action: 'Get insurances' },
					{ name: 'Get Legals', value: 'getLegals', action: 'Get legal records' },
					{ name: 'Get Taxes', value: 'getTaxes', action: 'Get tax records' },
				],
				default: 'getTaxes',
			},
			// Education & Relations operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['educationRelations'],
					},
				},
				options: [
					{ name: 'Get Educations', value: 'getEducations', action: 'Get educations' },
					{ name: 'Get Relations', value: 'getRelations', action: 'Get relations' },
				],
				default: 'getEducations',
			},
			// Merit operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['merit'],
					},
				},
				options: [
					{ name: 'Get Merit Awards', value: 'getMeritAwards', action: 'Get merit awards' },
					{ name: 'Get Merit Certs', value: 'getMeritCerts', action: 'Get merit certificates' },
					{ name: 'Get Merit Records', value: 'getMeritRecords', action: 'Get merit records' },
					{ name: 'Get Merit Rules', value: 'getMeritRules', action: 'Get merit rules' },
					{ name: 'Get Merit Templates', value: 'getMeritTemplates', action: 'Get merit templates' },
					{ name: 'Get Merit Types', value: 'getMeritTypes', action: 'Get merit types' },
				],
				default: 'getMeritRecords',
			},
			// Checkin Client operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['checkinClient'],
					},
				},
				options: [
					{ name: 'Create', value: 'create', action: 'Create checkin client' },
					{ name: 'Get Paginate Clients', value: 'getPaginateClients', action: 'Get paginated clients' },
					{ name: 'Mass Remove', value: 'massRemove', action: 'Remove multiple clients' },
					{ name: 'Remove', value: 'remove', action: 'Remove a client' },
					{ name: 'Update', value: 'update', action: 'Update checkin client' },
				],
				default: 'getPaginateClients',
			},
			...description,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: INodeExecutionData[];

				if (resource === 'employee') {
					const ops = employee as any;
					if (ops[operation]) {
						responseData = await ops[operation].execute.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}
				} else if (resource === 'organization') {
					const ops = organization as any;
					if (ops[operation]) {
						responseData = await ops[operation].execute.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}
				} else if (resource === 'employmentInfo') {
					const ops = employmentInfo as any;
					if (ops[operation]) {
						responseData = await ops[operation].execute.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}
				} else if (resource === 'payrollAttendance') {
					const ops = payrollAttendance as any;
					if (ops[operation]) {
						responseData = await ops[operation].execute.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}
				} else if (resource === 'taxInsuranceLegal') {
					const ops = taxInsuranceLegal as any;
					if (ops[operation]) {
						responseData = await ops[operation].execute.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}
				} else if (resource === 'educationRelations') {
					const ops = educationRelations as any;
					if (ops[operation]) {
						responseData = await ops[operation].execute.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}
				} else if (resource === 'merit') {
					const ops = merit as any;
					if (ops[operation]) {
						responseData = await ops[operation].execute.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}
				} else if (resource === 'checkinClient') {
					const ops = checkinClient as any;
					if (ops[operation]) {
						responseData = await ops[operation].execute.call(this, i);
					} else {
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
					}
				} else {
					throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
				}

				returnData.push(...responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : String(error);
					returnData.push({ json: { error: errorMessage } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

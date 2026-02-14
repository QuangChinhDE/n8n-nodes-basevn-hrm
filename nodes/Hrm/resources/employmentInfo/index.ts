import * as getEmployeeTypes from './getEmployeeTypes';
import * as getContractTypes from './getContractTypes';
import * as getContracts from './getContracts';
import * as getWorkHistories from './getWorkHistories';
import * as getCareerRecords from './getCareerRecords';

export { getEmployeeTypes, getContractTypes, getContracts, getWorkHistories, getCareerRecords };

export const description = [
	...getEmployeeTypes.description,
	...getContractTypes.description,
	...getContracts.description,
	...getWorkHistories.description,
	...getCareerRecords.description,
];

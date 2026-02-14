import * as getMeritRecords from './getMeritRecords';
import * as getMeritTypes from './getMeritTypes';
import * as getMeritRules from './getMeritRules';
import * as getMeritTemplates from './getMeritTemplates';
import * as getMeritAwards from './getMeritAwards';
import * as getMeritCerts from './getMeritCerts';

export { getMeritRecords, getMeritTypes, getMeritRules, getMeritTemplates, getMeritAwards, getMeritCerts };

export const description = [
	...getMeritRecords.description,
	...getMeritTypes.description,
	...getMeritRules.description,
	...getMeritTemplates.description,
	...getMeritAwards.description,
	...getMeritCerts.description,
];

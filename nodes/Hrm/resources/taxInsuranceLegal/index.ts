import * as getTaxes from './getTaxes';
import * as getInsurances from './getInsurances';
import * as getLegals from './getLegals';

export { getTaxes, getInsurances, getLegals };

export const description = [
	...getTaxes.description,
	...getInsurances.description,
	...getLegals.description,
];

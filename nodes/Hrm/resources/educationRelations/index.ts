import * as getEducations from './getEducations';
import * as getRelations from './getRelations';

export { getEducations, getRelations };

export const description = [
	...getEducations.description,
	...getRelations.description,
];

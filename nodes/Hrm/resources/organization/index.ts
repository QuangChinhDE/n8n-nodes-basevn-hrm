import * as getAreas from './getAreas';
import * as getOffices from './getOffices';
import * as getTeams from './getTeams';
import * as getPositions from './getPositions';
import * as getPositionTypes from './getPositionTypes';

export { getAreas, getOffices, getTeams, getPositions, getPositionTypes };

export const description = [
	...getAreas.description,
	...getOffices.description,
	...getTeams.description,
	...getPositions.description,
	...getPositionTypes.description,
];

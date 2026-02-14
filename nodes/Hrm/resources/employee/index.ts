import * as create from './create';
import * as getAll from './getAll';
import * as get from './get';
import * as update from './update';
import * as setCheckinCode from './setCheckinCode';

export { create, getAll, get, update, setCheckinCode };

export const description = [
	...create.description,
	...getAll.description,
	...get.description,
	...update.description,
	...setCheckinCode.description,
];

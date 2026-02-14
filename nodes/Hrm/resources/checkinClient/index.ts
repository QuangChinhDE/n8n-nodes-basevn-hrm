import * as getPaginateClients from './getPaginateClients';
import * as create from './create';
import * as update from './update';
import * as remove from './remove';
import * as massRemove from './massRemove';

export { getPaginateClients, create, update, remove, massRemove };

export const description = [
	...getPaginateClients.description,
	...create.description,
	...update.description,
	...remove.description,
	...massRemove.description,
];

import * as uuidv5 from 'uuid/v5';

import { environment } from '../../../../environments/environment';

export const getUUID = (modifier = 0): string => {
  const name = environment.uuid.domain + new Date().getTime() + modifier;
  return uuidv5(name, environment.uuid.namespace);
};

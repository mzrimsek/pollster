import { Poll } from '../models';

export const getOptionsFrom = (poll: Poll): string[] => {
  return Object.entries(poll.options).map(([key]) => key);
};

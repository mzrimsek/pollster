import { SelectionMode } from '../../../shared/models';

export interface Option {
  id: number;
  value: string;
}

export interface CreatePollInfo {
  title: string;
  options: Option[];
  selectionMode: SelectionMode;
  validUntil: number | null;
}

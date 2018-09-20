export type SelectionMode = 'SINGLE' | 'MULTI';

export interface Poll {
  title: string;
  options: Record<string, number>;
  selectionMode: SelectionMode;
  createdAt: number;
  createdByName: string;
  createdByUid: string;
  validUntil: number | null;
}

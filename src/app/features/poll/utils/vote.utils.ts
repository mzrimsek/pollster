import { SelectionMode } from '../../../shared/models';

export const getVotes = (newSelection: string, currentSelections: string[], selectionMode: SelectionMode): string[] => {
  if (selectionMode === 'SINGLE') {
    return [newSelection];
  } else {
    const index = currentSelections.indexOf(newSelection);
    if (index !== -1) {
      currentSelections.splice(index, 1);
      return currentSelections.sort();
    }
    return [...currentSelections, newSelection].sort();
  }
};

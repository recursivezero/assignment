const state = {
  entries: []
};

export const getEntries = () => [...state.entries];

export const addEntry = (entry) => {
  state.entries.push(entry);
};

export const isDuplicate = (value) => {
  return state.entries.some(e => e.value === value);
};
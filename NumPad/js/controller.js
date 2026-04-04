import { CONFIG } from "./config.js";
import { addEntry, isDuplicate } from "./state.js";
import { isValidInput, getDateTime } from "./utils.js";

export const createEntry = (value) => {

  if (!isValidInput(value, CONFIG.MAX_LENGTH)) {
    return { success: false, message: "Invalid input (no space, max 16 chars)" };
  }

  if (!CONFIG.ALLOW_DUPLICATES && isDuplicate(value)) {
    return { success: false, message: "Duplicate not allowed" };
  }

  const { date, time } = getDateTime();

  const entry = {
    value,
    date,
    time,
    user: CONFIG.USER_NAME
  };

  addEntry(entry);

  return { success: true, entry };
};
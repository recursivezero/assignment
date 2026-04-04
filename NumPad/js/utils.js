export const isValidInput = (value, maxLength) => {
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(value) && value.length <= maxLength;
};

export const getDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString(),
    time: now.toLocaleTimeString()
  };
};
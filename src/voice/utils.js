export const setProps = {};

export const checkFunc = async (cb) => {
  if (typeof cb !== 'function') {
    console.error('Please provide a callback function for !!');
    return false;
  }

  return true;
};

export const isNumeric = (num) => {
  if (num === null) return false;

  return !isNaN(num);
};

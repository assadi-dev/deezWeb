export const getItems = async (key) => {
  let data = await localStorage.getItem(key);
  if (data) {
    data = JSON.parse(data);
  } else {
    setItem(key, []);
    data = await localStorage.getItem(key);
    data = JSON.parse(data, true);
  }
  data = [...new Set(data)];
  return data;
};

export const setItem = async (key, value) => {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
  let data = await localStorage.getItem(key);
  data = JSON.parse(data, true);
  data = [...new Set(data)];
  return data;
};

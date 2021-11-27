// Remove all nested keys on object and make it one object;
export const convertNestedObj = (
  obj: { [k: string]: any },
  parentKey: string,
  data: { [k: string]: any } = {}
): { [k: string]: any } => {
  // Loop through each key in the object
  for (let k in obj) {
    // If the parent key exists (its a nested object) then modify the key and add it to the final object
    const name: string = parentKey ? `${parentKey}.${k}` : k;
    // If the value on that key is an object then its nested, pass your current key name plus the new object and the final data
    if (obj[k] && typeof obj[k] == "object") {
      convertNestedObj(obj[k], name, data);
    } else {
      // Set the new key to the name created with the parent key (if it exists)
      data[name] = obj[k];
    }
  }

  return data;
};

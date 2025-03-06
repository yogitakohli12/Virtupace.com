export const plaintextAlphabetSpecial = `;,.'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{($_-*#@!}):"`;
export const plaintextAlphabet = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
const shift = 10;

const getCipherAlphabet = (store: string) => {
  const cipherAlphabet = store.split("").map((_symbol, index) => {
    const newIndex = (index + shift) % store.length;
    return store[newIndex];
  });
  return cipherAlphabet;
};

export const encipher = (message: string, salt?: string) => {
  return message
    .split("")
    .map((symbol) => {
      const store = salt || plaintextAlphabet;
      const index = store.indexOf(symbol);
      if (index === -1) {
        return symbol;
      }
      return getCipherAlphabet(store)[index];
    })
    .join("");
};

export const decipher = (message: string, salt?: string) => {
  return message
    .split("")
    .map((symbol) => {
      const store = salt || plaintextAlphabet;
      const index = getCipherAlphabet(store).indexOf(symbol);
      if (index === -1) {
        return symbol;
      }
      return store[index];
    })
    .join("");
};

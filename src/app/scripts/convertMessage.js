module.exports = function celularNumero(texto) {
  let lastGroup;
  const mapping = {
    1: '1',
    ABC: '2',
    DEF: '3',
    GHI: '4',
    JKL: '5',
    MNO: '6',
    PQRS: '7',
    TUV: '8',
    WXYZ: '9',
    ' ': '0',
    '': '_',
  };

  const convertCharToNumeric = function a(char) {
    const keys = Object.keys(mapping);
    let result = '';
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
      const key = keys[keyIndex];
      const value = mapping[key];

      const pos = key.indexOf(char);
      if (pos !== -1) {
        if (lastGroup !== undefined && lastGroup === value) {
          result += '_';
        }

        result += Array(key.indexOf(char) + 2).join(value);
        lastGroup = value;
        break;
      }
    }

    return result;
  };

  let result = '';
  for (let i = 0; i <= (texto.length - 1); i += 1) {
    const char = texto.charAt(i);
    result += convertCharToNumeric(char);
  }

  return result;
};

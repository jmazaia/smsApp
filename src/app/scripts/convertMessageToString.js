module.exports = function celularNumero(texto) {
  const mapping = {
    2: 'A',
    22: 'B',
    222: 'C',
    3: 'D',
    33: 'E',
    333: 'F',
    4: 'G',
    44: 'H',
    444: 'I',
    5: 'J',
    55: 'K',
    555: 'L',
    6: 'M',
    66: 'N',
    666: 'O',
    7: 'P',
    77: 'Q',
    777: 'R',
    7777: 'S',
    8: 'T',
    88: 'U',
    888: 'V',
    9: 'W',
    99: 'X',
    999: 'Y',
    9999: 'Z',
    _: '',
    0: ' ',
  };

  const convertCharToString = function a(char) {
    const keys = Object.keys(mapping);
    let result = '';
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex += 1) {
      const key = keys[keyIndex];
      const value = mapping[key];
      const pos = key.indexOf(char);
      if (pos !== -1) {
        result += Array(key.indexOf(char) + 2).join(value);
        break;
      }
    }

    return result;
  };

  let result = '';
  for (let i = 0; i < (texto.length); i += 1) {
    let s = '';
    const s1 = texto.charAt(i);
    s = s1;
    if (texto.charAt(i) === texto.charAt(i + 1)) {
      const s2 = texto.charAt(i + 1);
      s += s2;
      i += 1;
      if (texto.charAt(i) === texto.charAt(i + 1)) {
        const s3 = texto.charAt(i);
        s += s3;
        i += 1;
        if (texto.charAt(i) === texto.charAt(i + 1)) {
          const s4 = texto.charAt(i);
          s += s4;
          i += 1;
          Number(s);
          result += convertCharToString(s);
        } else {
          Number(s);
          result += convertCharToString(s);
        }
      } else {
        Number(s);
        result += convertCharToString(s);
      }
    } else {
      Number(s);
      result += convertCharToString(s);
    }
  }

  return result;
};

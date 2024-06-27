import { useState } from 'react';

function CompareModule() {
  const [data, setData] = useState({});

  function compareObjects(object) {
    // Obtém as chaves dos dois objetos
    const keysData = Object.keys(data);
    const keysObject = Object.keys(object);

    // Se o número de chaves for diferente, os objetos são diferentes
    if (keysData.length !== keysObject.length) {
      return false;
    }

    // Verifica cada chave e valor
    for (const key of keysData) {
      // Se o valor da chave for um objeto, faz uma chamada recursiva
      if (typeof data[key] === 'object' && typeof object[key] === 'object') {
        if (!compareObjects(data[key], object[key])) {
          return false;
        }
      } else {
        // Se os valores das chaves não forem iguais, os objetos são diferentes
        if (data[key] !== object[key]) {
          return false;
        }
      }
    }

    // Se todas as chaves e valores forem iguais, os objetos são iguais
    return true;
  }

  return {
    data,
    setData,
    compareObjects
  };
}

export default CompareModule;
import { useState } from 'react';

function TypeUserClass() {

  const [typeUserName, setTypeUserName] = useState("");
  const [typeUserAcessLevel, setTypeUserAcessLevel] = useState("A");
  const [typeUserDescription, setTypeUserDescription] = useState("");
  const [typeUserId, setTypeUserId] = useState('');

  const [errorTypeUserName, setErrorTypeUserName] = useState("");
  const [errorTypeUserDescrition, setErrorTypeUserDescrition] = useState("");

  function propertyName() {
    return "Tipo Usuário " + typeUserName;
  }

  function gender() {
    return "o";
  }

  function getData(object) {
    setTypeUserName(object.nomeTipoUsuario);
    setTypeUserAcessLevel(object.nivelAcesso);
    setTypeUserDescription(object.descricaoTipoUsuario);
    setTypeUserId(object.id);
  }

  function setData() {
    return {
      id: typeUserId,
      nomeTipoUsuario: typeUserName,
      nivelAcesso: typeUserAcessLevel,
      descricaoTipoUsuario: typeUserDescription
    };
  }

  function clearData() {
    setTypeUserName('');
    setTypeUserAcessLevel('A');
    setTypeUserDescription('');
    setTypeUserId('');
  }

  function clearError() {
    setErrorTypeUserName('');
    setErrorTypeUserDescrition('');
  }

  async function verifyData() {
    var status = true;

    let name = '';
    let description = '';

    if (typeUserName) {
      if (typeUserName.length < 3) {
        name = 'O nome precisa ter no mínimo 3 letras!';
        status = false;
      }
    } else {
      name = 'O nome é requerido!';
      status = false;
    }

    if (typeUserDescription) {
      if (typeUserDescription.length < 5) {
        description = 'A descrição precisa ter no mínimo 5 letras!';
        status = false;
      }
    } else {
      description = 'A descrição é requerida!';
      status = false;
    }

    setErrorTypeUserName(name);
    setErrorTypeUserDescrition(description);

    return status;
  }

  return {
    // Atributos
    typeUserName,
    setTypeUserName,
    typeUserAcessLevel,
    setTypeUserAcessLevel,
    typeUserDescription,
    setTypeUserDescription,
    typeUserId,
    setTypeUserId,

    // Erros
    errorTypeUserName,
    errorTypeUserDescrition,

    // Funções Essencias
    propertyName,
    gender,
    getData,
    setData,
    clearData,
    clearError,
    verifyData
  };
}

export default TypeUserClass;
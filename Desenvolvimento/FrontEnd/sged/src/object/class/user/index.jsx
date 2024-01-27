import { useState, useEffect } from 'react';
import PersonClass from '../person';

function UserClass() {

  const person = PersonClass();

  // Atributos
  const personName = person.personName;
  const setPersonName = person.setPersonName;
  const personEmail = person.personEmail;
  const setPersonEmail = person.setPersonEmail;
  const personTelephone = person.personTelephone;
  const setPersonTelephone = person.setPersonTelephone;
  const personCpfCnpj = person.personCpfCnpj;
  const setPersonCpfCnpj = person.setPersonCpfCnpj;
  const personRgIe = person.personRgIe;
  const setPersonRgIe = person.setPersonRgIe;

  // Erros
  const errorPersonName = person.errorPersonName;
  const errorPersonEmail = person.errorPersonEmail;
  const errorPersonTelephone = person.errorPersonTelephone;
  const errorPersonCpfCnpj = person.errorPersonCpfCnpj;
  const errorPersonRgIe = person.errorPersonRgIe;

  // Funções Essenciais
  const getDataPerson = person.getData;
  const setDataPerson = person.setData;
  const clearDataPerson = person.clearData;
  const clearErrorPerson = person.clearError;
  const verifyDataPerson = person.verifyData;

  // Variáveis e Funções de Controle
  const identifyCpfCnpj = person.identifyCpfCnpj;
  const setIdentifyCpfCnpj = person.setIdentifyCpfCnpj;
  const identifyRgIe = person.identifyRgIe;
  const setIdentifyRgIe = person.setIdentifyRgIe;
  const handlePhone = person.handlePhone;
  const handleCpfCnpj = person.handleCpfCnpj;
  const handleRgIe = person.handleRgIe;
  person.effects();

  const [userPassword, setUserPassword] = useState('');
  const [userOffice, setUserOffice] = useState('');
  const [userStatus, setUserStatus] = useState(true);
  const [idTypeUser, setIdTypeUser] = useState('');
  const [userId, setUserId] = useState('');

  const [errorUserPassword, setErrorUserPassword] = useState('');
  const [errorUserOffice, setErrorUserOffice] = useState('');
  const [errorIdTypeUser, setErrorIdTypeUser] = useState('');

  function propertyName() {
    return "Usuário " + personName;
  }

  function gender() {
    return "o";
  }

  function getData(object) {
    getDataPerson(object);
    setUserPassword(object.senhaUsuario);
    setUserOffice(object.cargoUsuario);
    setUserStatus(object.statusUsuario);
    setIdTypeUser(object.idTipoUsuario);
    setUserId(object.id);
  }

  function setData() {
    return {
      ...setDataPerson(),
      id: userId,
      senhaUsuario: userPassword,
      cargoUsuario: userOffice,
      statusUsuario: userStatus,
      idTipoUsuario: idTypeUser
    }
  }

  function clearData() {
    clearDataPerson();
    setUserPassword('');
    setUserOffice('');
    setUserStatus(true);
    setIdTypeUser('');
    setUserId('');
  }

  function clearError() {
    clearErrorPerson();
    setErrorUserPassword('');
    setErrorUserOffice('');
    setErrorIdTypeUser('');
  }

  function verifyData(list) {
    clearError();
    var status = verifyDataPerson(list, userId ? userId : 0);

    let password = '';
    let office = '';
    let typeuser = '';

    if (userPassword) {
      if (userPassword.length < 6) {
        password = 'A senha precisa ter no mínimo 6 caracteres!';
        status = false;
      }
    } else {
      password = 'A senha é requerida!';
      status = false;
    }

    if (userOffice) {
      if (userOffice.length < 3) {
        office = 'O cargo deve ter no mínimo 3 letras!';
        status = false;
      }
    } else {
      office = 'O cargo é requerido!';
      status = false;
    }

    if (!idTypeUser) {
      typeuser = 'O tipo usuário é requerido!';
      status = false;
    }

    setErrorUserPassword(password);
    setErrorUserOffice(office);
    setIdTypeUser(typeuser);

    return status;
  }

  const [passwordStrength, setPasswordStrength] = useState('');

  function passwordStrengthIndicator() {

    let strength = '';

    if (userPassword) {
      strength = 'Inválida';

      if (userPassword.length >= 6) {
        const hasUpperCase = /[A-Z]/.test(userPassword);
        const hasLowerCase = /[a-z]/.test(userPassword);
        const hasNumber = /\d/.test(userPassword);
        const hasSpecialChar = /[!@#$%^&*]/.test(userPassword);

        if ((hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) || userPassword.length > 19) {
          strength = 'Forte';
        } else if (((hasUpperCase || hasLowerCase) && hasNumber) || userPassword.length > 11) {
          strength = 'Média';
        } else if (userPassword.length > 5) {
          strength = 'Fraca';
        }
      }
    }

    setPasswordStrength(strength ? 'Força da Senha: ' + strength : strength);
  };

  useEffect(() => {
    passwordStrengthIndicator();
  }, [userPassword]);

  return {
    /* -----  Pessoa  ----- */

    // Atributos
    personName,
    setPersonName,
    personEmail,
    setPersonEmail,
    personTelephone,
    setPersonTelephone,
    personCpfCnpj,
    setPersonCpfCnpj,
    personRgIe,
    setPersonRgIe,

    // Erros
    errorPersonName,
    errorPersonEmail,
    errorPersonTelephone,
    errorPersonCpfCnpj,
    errorPersonRgIe,

    // Variáveis e Funções de Controle
    identifyCpfCnpj,
    setIdentifyCpfCnpj,
    identifyRgIe,
    setIdentifyRgIe,
    handlePhone,
    handleCpfCnpj,
    handleRgIe,


    /* -----  Usuário  ----- */

    // Atributos
    userPassword,
    setUserPassword,
    userOffice,
    setUserOffice,
    userStatus,
    setUserStatus,
    idTypeUser,
    setIdTypeUser,
    userId,
    setUserId,

    // Erros
    errorUserPassword,
    errorUserOffice,
    errorIdTypeUser,

    // Funções Essencias
    propertyName,
    gender,
    getData,
    setData,
    clearData,
    clearError,
    verifyData,

    // Variável de Controle
    passwordStrength
  };
}

export default UserClass;
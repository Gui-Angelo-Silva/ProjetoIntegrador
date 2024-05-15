import { useState, useEffect } from 'react';
import PersonClass from '../person';

function UserClass() {

  const person = PersonClass();

  // Atributos
  const personPicture = person.personPicture;
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
  const errorPersonPicture = person.errorPersonPicture;
  const errorPersonName = person.errorPersonName;
  const errorPersonEmail = person.errorPersonEmail;
  const errorPersonTelephone = person.errorPersonTelephone;
  const errorPersonCpfCnpj = person.errorPersonCpfCnpj;
  const errorPersonRgIe = person.errorPersonRgIe;

  // Funções Essenciais
  const getDataPerson = person.getData;
  const setDataPerson = person.setData;
  const getErrorPerson = person.setError;
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
  const closeIcon = person.closeIcon;
  const addImage = person.addImage;
  const insertPicture = person.insertPicture;
  const removePicture = person.removePicture;
  const handleImageClick = person.handleImageClick;
  person.effects();

  const [userPassword, setUserPassword] = useState('');
  const [userOffice, setUserOffice] = useState('');
  const [userStatus, setUserStatus] = useState(true);
  const [idTypeUser, setIdTypeUser] = useState(0);
  const [userId, setUserId] = useState(0);

  const [errorUserPassword, setErrorUserPassword] = useState('');
  const [errorUserOffice, setErrorUserOffice] = useState('');
  const [errorIdTypeUser, setErrorIdTypeUser] = useState('');

  function propertyName() {
    return "Usuário " + personName;
  }

  function gender() {
    return "o";
  }

  function getData() {
    return {
      ...getDataPerson(),
      id: userId,
      senhaUsuario: userPassword,
      cargoUsuario: userOffice,
      statusUsuario: userStatus,
      idTipoUsuario: idTypeUser
    }
  }

  function setData(object) {
    setDataPerson(object);
    setUserPassword(object.senhaUsuario);
    setUserPassword(object.senhaUsuario);
    setUserOffice(object.cargoUsuario);
    setUserStatus(object.statusUsuario);
    setIdTypeUser(object.idTipoUsuario);
    setUserId(object.id);
  }

  function setError(json) {
    getErrorPerson(json);
  }

  function clearData() {
    clearDataPerson();
    setUserPassword('');
    setUserOffice('');
    setUserStatus(true);
    setIdTypeUser(0);
    setUserId(0);
  }

  function clearError() {
    clearErrorPerson();
    setErrorUserPassword('');
    setErrorUserOffice('');
    setErrorIdTypeUser('');
  }

  function verifyData() {
    clearError();
    var status = verifyDataPerson();

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
    setErrorIdTypeUser(typeuser);

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
    personPicture,
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
    errorPersonPicture,
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
    closeIcon,
    addImage,
    insertPicture,
    removePicture,
    handleImageClick,


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

    // Erros
    errorUserPassword,
    errorUserOffice,
    errorIdTypeUser,

    // Funções Essencias
    propertyName,
    gender,
    getData,
    setData,
    setError,
    clearData,
    clearError,
    verifyData,

    // Variáveis e Funções de Controle
    passwordStrength
  };
}

export default UserClass;
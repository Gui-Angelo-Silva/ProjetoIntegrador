import { useState } from 'react';
import Control from '../../../object/modules/control';

function LoginClass() {
  const control = Control();

  const [personEmail, setPersonEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [persistLogin, setPersistLogin] = useState(false);
  const [errorPersonEmail, setErrorPersonEmail] = useState('');
  const [errorUserPassword, setErrorUserPassword] = useState('');

  function propertyName() {
    return "Usuário";
  }

  function gender() {
    return "o";
  }

  function getData(object) {
    setPersonEmail(object.emailPessoa);
    setUserPassword(object.senhaUsuario);
    setPersistLogin(true);
  }

  function setData() {
    return {
      email: personEmail,
      senha: userPassword
    }
  }

  function clearData() {
    setPersonEmail('');
    setUserPassword('');
    setPersistLogin(false);
  }

  function clearError() {
    setErrorPersonEmail('');
    setErrorUserPassword('');
  }

  function verifyData(list, id) {
    clearError();
    let status = true;

    let email = '';
    let password = '';

    if (personEmail) {
      if (personEmail.includes(' ')) {
        email = 'O e-mail não pode conter espaço em branco!';
        status = false;
      }

      const hasAtSymbol = personEmail.includes('@');
      const hasDot = personEmail.includes('.');
      const lastDotPosition = personEmail.lastIndexOf('.');

      const quantSymbol = personEmail.split('@').length - 1;
      const indexSymbol = personEmail.indexOf('@');
      const indexLastCaracter = personEmail.length - 1;
      const [emailAddress, domain] = personEmail.split('@');

      if (!email && !hasAtSymbol) {
        email = 'E-mail inválido: O e-mail deve conter um "@"!';
        status = false;
      } else if (!email && !hasDot) {
        email = 'E-mail inválido: O e-mail deve conter um "."!';
        status = false;
      } else if (!email && quantSymbol > 1) {
        email = 'E-mail inválido: O e-mail não pode conter mais de um "@"!';
        status = false;
      } else {
        if (!email && !emailAddress) {
          email = 'E-mail inválido: O nome do usuário de e-mail não pode ser vazio!';
          status = false;
        } else if (!email && lastDotPosition <= personEmail.indexOf('@')) {
          email = 'E-mail inválido: O "." deve estar após o "@"!';
          status = false;
        } else if (!email && (personEmail[indexSymbol + 1] === '.' || personEmail[indexLastCaracter] === '.' || control.removeNonNumericCharacter(domain))) {
          email = 'E-mail inválido: Domínio ilegítimo!';
          status = false;
        }
      }

    } else {
      email = 'O e-mail é requerido!';
      status = false;
    }

    if (userPassword) {
      if (userPassword.length < 6) {
        password = 'A senha precisa ter no mínimo 6 caracteres!';
        status = false;
      }
    } else {
      password = 'A senha é requerida!';
      status = false;
    }

    setErrorPersonEmail(email);
    setErrorUserPassword(password);

    return status;
  }

  return {
    // Atributos
    personEmail,
    setPersonEmail,
    userPassword,
    setUserPassword,
    persistLogin,
    setPersistLogin,

    // Erros
    errorPersonEmail,
    errorUserPassword,

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

export default LoginClass;
import { useState } from "react";

function ConfigurationClass() {
  const [id, setId] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(false);
  const [tipoConfiguracao, setTipoConfiguracao] = useState('');

  const [errorDescricao, setErrorDescricao] = useState('');
  const [errorTipoConfiguracao, setErrorTipoConfiguracao] = useState('');

  function propertyName() {
    return "Configuração " + descricao;
  }

  function getData() {
    return {
      id: id,
      descricao: descricao,
      valor: valor,
      tipoConfiguracao: tipoConfiguracao
    };
  }

  function setData(object) {
    setId(object.id);
    setDescricao(object.descricao);
    setValor(object.valor);
    setTipoConfiguracao(object.tipoConfiguracao);
  }

  function clearData() {
    setId(0);
    setDescricao('');
    setValor(false);
    setTipoConfiguracao('');
  }

  function clearError() {
    setErrorDescricao('');
    setErrorTipoConfiguracao('');
  }

  function verifyData() {
    clearError();
    let status = true;

    let desc = '';
    let tipo = '';

    if (descricao) {
      if (descricao.length < 3) {
        desc = 'A descrição precisa ter no mínimo 3 caracteres!';
        status = false;
      }
    } else {
      desc = 'A descrição é requerida!';
      status = false;
    }

    if (!tipoConfiguracao) {
      tipo = 'O tipo de configuração é requerido!';
      status = false;
    }

    setErrorDescricao(desc);
    setErrorTipoConfiguracao(tipo);

    return status;
  }

  return {
    // Atributos
    id,
    setId,
    descricao,
    setDescricao,
    valor,
    setValor,
    tipoConfiguracao,
    setTipoConfiguracao,

    // Erros
    errorDescricao,
    errorTipoConfiguracao,

    // Funções Essenciais
    propertyName,
    getData,
    setData,
    clearData,
    clearError,
    verifyData
  };
}

export default ConfigurationClass;
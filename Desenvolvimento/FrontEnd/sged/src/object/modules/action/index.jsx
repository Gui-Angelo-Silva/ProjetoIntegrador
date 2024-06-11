import { useState, useEffect } from 'react';

function ActionManager() {
  const [status, setStatus] = useState(0);
  const [pointer, setPointer] = useState(getPointerFromStatus(0));

  useEffect(() => {
    setPointer(getPointerFromStatus(status));
  }, [status]);

  function getPointerFromStatus(number) {
    switch (number) {
      case 0:
        return 'blocked';
      case 1:
        return 'clickable';
      case 2:
        return 'waiting';
      default:
        return 'default';
    }
  }

  function getState() {
    switch (status) {
      case 0:
        return 'Bloqueado';
      case 1:
        return 'Efetuar';
      case 2:
        return 'Aguarde';
      default:
        return '. . .';
    }
  }

  function canPerformAction() {
    return status === 1;
  }

  return {
    status,
    pointer,
    setStatus,
    getState,
    canPerformAction
  };
}

export default ActionManager;
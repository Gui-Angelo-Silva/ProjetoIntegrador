function RequisitionClass() {

  function propertyName() {
    return "Requisição";
  }

  function gender() {
    return "a";
  }

  function setData() {
    const requisition = JSON.parse(sessionStorage.getItem("requisition"));
    sessionStorage.setItem("requisition", JSON.stringify({}));
    return requisition;
  }

  return {
    // Funções Essencias
    propertyName,
    gender,
    setData
  };
}

export default RequisitionClass;
import React, { useState, useEffect, memo } from "react";
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Button } from "@mui/material";
import { MagnifyingGlass, Funnel } from "@phosphor-icons/react";
import * as functions from "../functions/functions";

const FilterField = ({ label, name, value, onChange, type = "text" }) => {
  const handleChange = (event) => {
    const { value } = event.target;

    if (type === "date") {
      const correctedValue = value
        .replace(/[^0-9\-]/g, "")
        .split("-")
        .map((part, index) => {
          if (index === 0) return part.slice(0, 4);
          if (index === 1 || index === 2) return part.slice(0, 2);
          return part;
        })
        .join("-");
      onChange({ target: { name, value: correctedValue } });
    } else {
      onChange(event);
    }
  };

  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={handleChange}
      fullWidth
      type={type}
      InputLabelProps={{ shrink: true }}
    />
  );
};

const FilterSelect = memo(({ label, name, value, onChange, options, isOpen, onOpen, onClose }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      onOpen={onOpen}
      onClose={onClose}
      displayEmpty
      open={isOpen}
    >
      {options.length === 0 ? (
        <MenuItem disabled>
          <p>Não há nenhum {label} para seleção!</p>
        </MenuItem>
      ) : (
        options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
      )}
    </Select>
  </FormControl>
));

const FilterModule = ({ onFilter }) => {
  const [data, setData] = useState({});
  const [filters, setFilters] = useState({
    typeProcess: "",
    identificationProcess: "",
    document: "",
    status: "",
    stage: "",
    documentType: "",
    startDate: "",
    completionDate: "",
    approvationDate: "",
    realstate: "",
    engineer: "",
    supervisor: "",
    responsible: "",
    approvator: "",
  });

  const [openSelect, setOpenSelect] = useState({
    status: false,
    realstate: false,
    typeProcess: false,
    engineer: false,
    supervisor: false,
    responsible: false,
    approvator: false,
  });

  const statusOptions = [
    { value: "0", label: "Em Espera" },
    { value: "1", label: "Em Progresso" },
    { value: "2", label: "Em Análise" },
    { value: "3", label: "Aprovado" },
    { value: "4", label: "Reprovado" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await functions.GetFiltersProcess();
      setData(response);
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevState) => ({
      ...prevState,
      [name]: value || "",  // Garante que nunca seja undefined ou null
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      typeProcess: "",
      identificationProcess: "",
      document: "",
      status: "",
      stage: "",
      documentType: "",
      startDate: "",
      completionDate: "",
      approvationDate: "",
      realstate: "",
      engineer: "",
      supervisor: "",
      responsible: "",
      approvator: "",
    });
    onFilter({});
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleSelectOpen = (name) => {
    setOpenSelect((prevState) => {
      const newState = {};
      // Fecha todos os selects
      Object.keys(prevState).forEach((key) => {
        newState[key] = false; // Fecha todos
      });
      // Abre apenas o select clicado
      newState[name] = true;
      return newState;
    });
  };

  const handleSelectClose = () => {
    // Fecha todos os selects
    setOpenSelect({
      status: false,
      realstate: false,
      typeProcess: false,
      engineer: false,
      supervisor: false,
      responsible: false,
      approvator: false,
    });
  };

  return (
    <Box className="p-4 bg-white rounded-lg shadow-sm mt-4" style={{ maxWidth: "1200px", margin: "auto" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
          <Funnel size={24} />
          Filtro
        </h2>
        <Button variant="outlined" color="error" onClick={handleClearFilters} className="flex items-center gap-2">
          Limpar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FilterField label="Identificação Processo" name="identificationProcess" value={filters.identificationProcess} onChange={handleInputChange} />
        <FilterField label="Documento" name="document" value={filters.document} onChange={handleInputChange} />
        <FilterField label="Data Início" name="startDate" value={filters.startDate} onChange={handleInputChange} type="date" />
        <FilterField label="Data Finalização" name="completionDate" value={filters.completionDate} onChange={handleInputChange} type="date" />
        <FilterField label="Data Aprovação" name="approvationDate" value={filters.approvationDate} onChange={handleInputChange} type="date" />
        <FilterSelect label="Status" name="status" value={filters.status || ''} onChange={handleInputChange} options={statusOptions} isOpen={openSelect["status"]} onOpen={() => handleSelectOpen("status")} onClose={handleSelectClose} />
        <FilterSelect label="Imóvel" name="realstate" value={filters.realstate || ''} onChange={handleInputChange} options={data.imoveis || []} isOpen={openSelect["realstate"]} onOpen={() => handleSelectOpen("realstate")} onClose={handleSelectClose} />
        <FilterSelect label="Tipo Processo" name="typeProcess" value={filters.typeProcess || ''} onChange={handleInputChange} options={data.tiposProcesso || []} isOpen={openSelect["typeProcess"]} onOpen={() => handleSelectOpen("typeProcess")} onClose={handleSelectClose} />
        <FilterSelect label="Engenheiro" name="engineer" value={filters.engineer || ''} onChange={handleInputChange} options={data.engenheiros || []} isOpen={openSelect["engineer"]} onOpen={() => handleSelectOpen("engineer")} onClose={handleSelectClose} />
        <FilterSelect label="Fiscal" name="supervisor" value={filters.supervisor || ''} onChange={handleInputChange} options={data.fiscais || []} isOpen={openSelect["supervisor"]} onOpen={() => handleSelectOpen("supervisor")} onClose={handleSelectClose} />
        <FilterSelect label="Responsável" name="responsible" value={filters.responsible || ''} onChange={handleInputChange} options={data.responsaveis || []} isOpen={openSelect["responsible"]} onOpen={() => handleSelectOpen("responsible")} onClose={handleSelectClose} />
        <FilterSelect label="Aprovador" name="approvator" value={filters.approvator || ''} onChange={handleInputChange} options={data.aprovadores || []} isOpen={openSelect["approvator"]} onOpen={() => handleSelectOpen("approvator")} onClose={handleSelectClose} />
      </div>

      <div className="flex justify-end mt-4">
        <Button variant="contained" color="primary" onClick={handleApplyFilters} className="flex items-center gap-2">
          Pesquisar
        </Button>
      </div>
    </Box>
  );
};

export default FilterModule;
import React, { useState, useEffect } from "react";
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Button } from "@mui/material";
import { MagnifyingGlass, Funnel } from "@phosphor-icons/react";

const FilterField = ({ label, name, value, onChange, type = "text" }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={(e) => onChange(e.target.name, e.target.value)}
    fullWidth
    type={type}
    InputLabelProps={{ shrink: true }}
  />
);

const FilterSelect = ({ label, name, value, onChange, options }) => (
  <FormControl fullWidth>
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.name, e.target.value)}
      displayEmpty
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const FilterModule = ({ filters, setFilters, setRequest }) => {
  const handleInputChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      id: "",
      identificacaoProcesso: "",
      descricaoProcesso: "",
      situacaoProcesso: "",
      dataInicio1: "",
      dataInicio2: "",
      dataFinalizacao1: "",
      dataFinalizacao2: "",
      dataAprovacao1: "",
      dataAprovacao2: "",
      status: -1,
      inscricaoCadastral: "",
      nomeTipoProcesso: "",
      nomeFiscal: "",
      nomeEngenheiro: "",
      nomeResponsavel: "",
      nomeAprovador: "",

      ordenarIdentificacaoProcesso: 0,
      ordenarDescricaoProcesso: 0,
      ordenarSituacaoProcesso: 0,
      ordenarDataInicio: 0,
      ordenarDataFinalizacao: 0,
      ordenarDataAprovacao: 0,
      ordenarStatus: 0,
      ordenarInscricaoCadastral: 0,
      ordenarNomeTipoProcesso: 0,
      ordenarNomeFiscal: 0,
      ordenarNomeEngenheiro: 0,
      ordenarNomeResponsavel: 0,
      ordenarNomeAprovador: 0,
    });
  };

  const statusOptions = [
    { value: -1, label: "Nenhum" },
    { value: 0, label: "Em Espera" },
    { value: 1, label: "Em Progresso" },
    { value: 2, label: "Em Análise" },
    { value: 3, label: "Aprovado" },
    { value: 4, label: "Reprovado" },
  ];

  return (
    <Box className="p-4 bg-white rounded-lg shadow-sm mt-4" style={{ maxWidth: "1200px", margin: "auto" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
          <Funnel size={24} />
          Filtro
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <FilterField
          label="Código Processo"
          name="id"
          value={filters.id}
          onChange={handleInputChange}
        />
        <FilterField
          label="Identificação Processo"
          name="identificacaoProcesso"
          value={filters.identificacaoProcesso}
          onChange={handleInputChange}
        />
        <FilterField
          label="Situação Processo"
          name="situacaoProcesso"
          value={filters.situacaoProcesso}
          onChange={handleInputChange}
        />
        <FilterField
          label="Descrição Processo"
          name="descricaoProcesso"
          value={filters.descricaoProcesso}
          onChange={handleInputChange}
        />
        <FilterField
          label="Data Início (De)"
          name="dataInicio1"
          value={filters.dataInicio1}
          onChange={handleInputChange}
          type="date"
        />
        <FilterField
          label="Data Início (Até)"
          name="dataInicio2"
          value={filters.dataInicio2}
          onChange={handleInputChange}
          type="date"
        />
        <FilterField
          label="Data Finalização (De)"
          name="dataFinalizacao1"
          value={filters.dataFinalizacao1}
          onChange={handleInputChange}
          type="date"
        />
        <FilterField
          label="Data Finalização (Até)"
          name="dataFinalizacao2"
          value={filters.dataFinalizacao2}
          onChange={handleInputChange}
          type="date"
        />
        <FilterField
          label="Data Aprovação (De)"
          name="dataAprovacao1"
          value={filters.dataAprovacao1}
          onChange={handleInputChange}
          type="date"
        />
        <FilterField
          label="Data Aprovação (Até)"
          name="dataAprovacao2"
          value={filters.dataAprovacao2}
          onChange={handleInputChange}
          type="date"
        />
        <FilterSelect
          label="Status Processo"
          name="status"
          value={filters.status}
          onChange={handleInputChange}
          options={statusOptions}
        />
        <FilterField
          label="Tipo Processo"
          name="nomeTipoProcesso"
          value={filters.nomeTipoProcesso}
          onChange={handleInputChange}
        />
        <FilterField
          label="Imóvel"
          name="inscricaoCadastral"
          value={filters.inscricaoCadastral}
          onChange={handleInputChange}
        />
        <FilterField
          label="Engenheiro"
          name="nomeEngenheiro"
          value={filters.nomeEngenheiro}
          onChange={handleInputChange}
        />
        <FilterField
          label="Fiscal"
          name="nomeFiscal"
          value={filters.nomeFiscal}
          onChange={handleInputChange}
        />
        <FilterField
          label="Responsável"
          name="nomeResponsavel"
          value={filters.nomeResponsavel}
          onChange={handleInputChange}
        />
        <FilterField
          label="Aprovador"
          name="nomeAprovador"
          value={filters.nomeAprovador}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex justify-end mt-4 gap-x-10">
      <Button variant="outlined" color="error" onClick={handleClearFilters}>
          Limpar
        </Button>

        <Button variant="contained" color="primary" onClick={() => setRequest(true)}>
          Pesquisar
        </Button>
      </div>
    </Box>
  );
};

export default FilterModule;

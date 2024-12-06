import React from "react";
import { Box, TextField, Table, TableRow, TableCell, TableBody, Select, MenuItem } from "@mui/material";
import { CaretCircleDoubleUp, CaretCircleDoubleDown, CaretCircleUpDown } from "@phosphor-icons/react";

const OrderModule = ({ filters, setFilters, page, setPage, elementsPage, setElementsPage, pages }) => {
  // Função para lidar com clique em uma coluna
  const handleColumnClick = (columnName) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      Object.keys(updatedFilters).forEach((key) => {
        if (key.startsWith("ordenar") && key !== columnName) {
          updatedFilters[key] = 0; // Reseta as outras colunas
        }
      });
      // Alterna o estado da coluna clicada
      updatedFilters[columnName] =
        updatedFilters[columnName] === 0 ? 1 : updatedFilters[columnName] === 1 ? -1 : 0;
      return updatedFilters;
    });
  };

  // Função para renderizar o ícone de ordenação
  const renderSortIcon = (value) => {
    if (value === 1) return <CaretCircleDoubleUp />;
    if (value === -1) return <CaretCircleDoubleDown />;
    return <CaretCircleUpDown />;
  };

  // Função para lidar com clique nos botões de página
  const handlePageClick = (pageNumber) => setPage(pageNumber);

  // Função para lidar com entrada no campo de página
  const handlePageInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0 && value <= pages) {
      setPage(value);
    }
  };

  // Função para lidar com mudança de elementos por página
  const handleElementsPageChange = (event) => {
    setElementsPage(event.target.value);
  };

  return (
    <Box>
      {/* Tabela de Ordenação */}
      <Table>
        <TableBody>
          <TableRow>
            {Object.keys(filters)
              .filter((key) => key.startsWith("ordenar"))
              .map((column) => (
                <TableCell
                  key={column}
                  onClick={() => handleColumnClick(column)}
                  style={{ cursor: "pointer" }}
                >
                  {column.replace("ordenar", "")}
                  {renderSortIcon(filters[column])}
                </TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>

      {/* Botões de Paginação e Campo de Página */}
      <Box display="flex" alignItems="center" marginTop={2} gap={2}>
        <Box display="flex" gap={1}>
          {Array.from({ length: pages || 1 }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              style={{
                padding: "6px 12px",
                margin: "0 4px",
                border: "1px solid",
                borderColor: index + 1 === page ? "green" : "#ccc",
                backgroundColor: pages === 0 ? "#E0E0E0" : index + 1 === page ? "green" : "transparent",
                color: pages === 0 ? "#a9a9a9" : index + 1 === page ? "white" : "black",
                cursor: pages === 0 ? "not-allowed" : "pointer",
                borderRadius: "4px",
              }}
              disabled={pages === 0}
            >
              {pages === 0 ? 0 : index + 1}
            </button>
          ))}
        </Box>
        <TextField
          variant="outlined"
          size="small"
          type="number"
          inputProps={{
            min: 1,
            max: pages,
            step: 1,
          }}
          onBlur={handlePageInputChange}
          style={{ width: "80px" }}
          placeholder="Ir para..."
        />
        <Select
          variant="outlined"
          size="small"
          value={elementsPage} // Usando o estado do valor selecionado
          onChange={handleElementsPageChange}
          style={{ marginLeft: "8px", width: "100px" }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
      </Box>
    </Box>
  );
};

export default OrderModule;

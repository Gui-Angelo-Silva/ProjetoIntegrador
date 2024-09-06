import React, { useEffect, useState } from 'react'
import LayoutPage from '../../../../components/Layout/LayoutPage'
import LinkTitle from '../../../../components/Title/LinkTitle'
import Select from "react-select"
import { useMontage } from '../../../../object/modules/montage'

const AddProcess = () => {
  const { componentMounted } = useMontage();
  const [expandedRows, setExpandedRows] = useState([]);
  const [expandedRows2, setExpandedRow2] = useState([]);

  const data = [
    { id: 1, title: 'Processo 1', details: 'Detalhes do processo 1' },
    { id: 2, title: 'Processo 2', details: 'Detalhes do processo 2' },
    { id: 3, title: 'Processo 3', details: 'Detalhes do processo 3' },
  ];

  useEffect(() => {
    componentMounted();
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter(rowId => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };
  const toggleRow2 = (id) => {
    setExpandedRows2((prevExpandedRows) =>
      prevExpandedRows.includes(id)
        ? prevExpandedRows.filter(rowId => rowId !== id)
        : [...prevExpandedRows, id]
    );
  };

  return (
    <LayoutPage>
      <LinkTitle pageName="Cadastrar Processo" otherRoute="Processo" />
      <div className='mt-8'>
        <div className='flex'>
          <div className='mr-8 h-[200px] w-[200px] rounded-lg border-[2px] flex items-center justify-center'>
            GUi
          </div>
          <div className='flex flex-col w-1/3 gap-y-3'>
            <h1 className='text-lg text-gray-700'>Imóvel:</h1>
            <Select />
            <h1 className='text-lg text-gray-700'>Proprietário:</h1>
            <input type='text' disabled className='cursor-not-allowed rounded-sm border-[#e5e7eb]' />
          </div>
        </div>
        <hr className='my-10' />

        <div className='flex gap-x-4'>
          <ul className="w-3/4">
            {data.map(row => (
              <li key={row.id} className="border-b border-gray-200 mb-4">
                <div className="flex justify-between items-center p-4 bg-gray-300 cursor-pointer" onClick={() => toggleRow(row.id)}>
                  <span>{row.title}</span>
                  <button className="text-blue-600">Expandir</button>
                </div>
                {expandedRows.includes(row.id) && (
                  <ul className="bg-gray-100 p-4">
                    <li className="p-2 border-b border-gray-200">{row.details}</li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <ul className="w-1/2">
            {data.map(row => (
              <li key={row.id} className="border-b border-gray-200 mb-4">
                <div className="flex justify-between items-center p-4 bg-gray-300 cursor-pointer" onClick={() => toggleRow2(row.id)}>
                  <span>{row.title}</span>
                  <button className="text-blue-600">Expandir</button>
                </div>
                {expandedRows2.includes(row.id) && (
                  <ul className="bg-gray-100 p-4">
                    <li className="p-2 border-b border-gray-200">{row.details}</li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div >
    </LayoutPage>
  )
}

export default AddProcess;
import React, { useEffect, useState } from 'react'
import LayoutPage from '../../../../components/Layout/LayoutPage'
import LinkTitle from '../../../../components/Title/LinkTitle'
import Select from "react-select"
import { useMontage } from '../../../../object/modules/montage'

const AddProcess = () => {
  const { componentMounted } = useMontage();
  const [expandedRows, setExpandedRows] = useState([]); // Controla quais etapas estão expandidas
  const [expandedDetail, setExpandedDetail] = useState(null); // Controla qual "detail" foi clicado

  const data = [
    {
      id: 1, 
      title: 'Etapa 1', 
      details: [
        { id: 1, text: 'Detalhe 1A', documents: [{ id: 1, name: 'Documento A1' }, { id: 2, name: 'Documento B1' }] },
        { id: 2, text: 'Detalhe 1B', documents: [{ id: 3, name: 'Documento C1' }, { id: 4, name: 'Documento D1' }] },
      ]
    },
    {
      id: 2, 
      title: 'Etapa 2', 
      details: [
        { id: 3, text: 'Detalhe 2A', documents: [{ id: 5, name: 'Documento A2' }, { id: 6, name: 'Documento B2' }] },
        { id: 4, text: 'Detalhe 2B', documents: [{ id: 7, name: 'Documento C2' }, { id: 8, name: 'Documento D2' }] },
      ]
    }
  ];

  useEffect(() => {
    componentMounted();
  }, []);

  // Controla a expansão da etapa
  const toggleRow = (rowId) => {
    setExpandedRows(prevRows =>
      prevRows.includes(rowId)
        ? prevRows.filter(id => id !== rowId) // Remove a etapa se já estiver expandida
        : [...prevRows, rowId] // Adiciona a etapa se não estiver expandida
    );
  };

  const toggleDetail = (detailId) => {
    setExpandedDetail(prevDetail => prevDetail === detailId ? null : detailId); // Expande o "detail" selecionado
  };

  return (
    <LayoutPage>
      <LinkTitle pageName="Cadastrar Processo" otherRoute="Processo" />
      <div className='mt-8'>
        <div className='flex'>
          <div className='mr-8 h-[200px] w-[200px] rounded-lg border-[2px] flex items-center justify-center'>
            Gui
          </div>
          <div className='flex flex-col w-1/3 gap-y-3'>
            <h1 className='text-lg text-gray-700'>Imóvel:</h1>
            <Select />
            <h1 className='text-lg text-gray-700'>Proprietário:</h1>
            <input type='text' disabled className='cursor-not-allowed rounded-sm border-[#e5e7eb]' />
          </div>
        </div>
        <hr className='my-10' />

        <div className='flex gap-x-5'>
          {/* Lista de Etapas */}
          <ul className="w-3/4">
            {data.map(row => (
              <li key={row.id} className="border-b border-gray-200 mb-4">
                <div className="flex justify-between items-center p-4 bg-gray-300 cursor-pointer" onClick={() => toggleRow(row.id)}>
                  <span>{row.title}</span>
                  <button className="text-blue-600">{expandedRows.includes(row.id) ? 'Recolher' : 'Expandir'}</button>
                </div>
                {expandedRows.includes(row.id) && (
                  <ul className="bg-gray-100 p-4">
                    {/* Lista de Detalhes */}
                    {row.details.map(detail => (
                      <li key={detail.id} className="p-2 border-b border-gray-200 cursor-pointer" onClick={() => toggleDetail(detail.id)}>
                        <span>{detail.text}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Lista de Documentos Associados ao Detalhe Selecionado */}
          {expandedDetail && (
            <div className="w-1/2">
              {data.map(row => 
                row.details.map(detail => 
                  detail.id === expandedDetail && (
                    <div key={detail.id} className="bg-white p-4 border">
                      <h2 className="text-lg mb-4">Documentos para {detail.text}</h2>
                      {detail.documents.map(doc => (
                        <div key={doc.id} className="mb-2">
                          <span>{doc.name}</span>
                          <input type="file" className="ml-4" />
                        </div>
                      ))}
                    </div>
                  )
                )
              )}
            </div>
          )}
        </div>
      </div>
    </LayoutPage>
  );
}

export default AddProcess;
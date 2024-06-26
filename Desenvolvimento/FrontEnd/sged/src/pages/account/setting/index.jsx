import React, { useEffect, useState } from 'react';
import LayoutPage from '../../../components/Layout/LayoutPage';
import Title from '../../../components/Title/Title';
import { useMontage } from '../../../object/modules/montage';
import Switch from '../../../components/Switch/Switch';

const Setting = () => {
  const { componentMounted } = useMontage();
  const [switchStates, setSwitchStates] = useState({
    taskMessages: false,
    dataAlerts: false,
  });

  useEffect(() => {
    componentMounted();
  }, [componentMounted]);

  const handleSwitchChange = (switchName) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [switchName]: !prevState[switchName],
    }));
  };

  return (
    <LayoutPage>
      <Title title="Configurações" />
      <div className="flex flex-col flex-grow mt-4 border-2 border-[#d8d8d8] rounded-lg pt-2 px-3 shadow-sm h-[800px]">
        <div className="bg-[#59C3D3]/25 px-3 py-[11px] rounded-lg">
          <h1 className="text-[#2D636B] text-xl">Geral</h1>
        </div>
        <div className="flex flex-col mt-6 px-3 gap-y-3 mb-6 flex-grow">
          <h1 className="text-[#2D636B] text-xl">Notificações</h1>
          <div className="flex w-full items-center gap-2">
            <Switch
              checked={switchStates.taskMessages}
              onChange={() => handleSwitchChange('taskMessages')}
            />
            <h2 className="text-lg text-[#636262]">Mensagens de Tarefas Pendentes</h2>
          </div>
          <div className="flex w-full items-center gap-2">
            <Switch
              checked={switchStates.dataAlerts}
              onChange={() => handleSwitchChange('dataAlerts')}
            />
            <h2 className="text-lg text-[#636262]">Alerta de Dados Obtidos</h2>
          </div>
        </div>
        <div className='flex w-full justify-end pb-3'>
          <button className='w-[132px] h-[53px] rounded-lg bg-[#2D636B] text-white hover:scale-105 transition hover:transition-colors hover:bg-[#005A66]'>
            Salvar
          </button>
        </div>
      </div>
    </LayoutPage>
  );
};

export default Setting;
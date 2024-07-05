import React, { useEffect, useState } from 'react';
import LayoutPage from '../../../components/Layout/LayoutPage';
import Title from '../../../components/Title/Title';
import Switch from '../../../components/Switch/Switch';
import ConfigurationClass from '../../../object/class/configuration';
import ConnectionService from '../../../object/service/connection';
import { useMontage } from '../../../object/modules/montage';

const Setting = () => {
  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, [])

  const connection = new ConnectionService();
  const setting = ConfigurationClass();

  const [switchStates, setSwitchStates] = useState({
    taskMessages: false,
    dataAlerts: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await connection.endpoint("Configuracao").get();
        const configurations = response; 
        if (configurations) {
          setting.setData(configurations); 
          setSwitchStates({
            taskMessages: configurations.taskMessages,
            dataAlerts: configurations.dataAlerts,
          });
        }
      } catch (error) {
        console.error('Erro ao buscar configurações:', error);
      }
    }

    fetchData();
  }, [setting, connection]); 

  const handleSwitchChange = async (switchName) => {
    try {
      let updatedConfigurations = { ...setting.getData() };
      updatedConfigurations[switchName] = !switchStates[switchName];
      await connection.endpoint("Configuracao").action("activate").put(updatedConfigurations.id); 
      setting.setData(updatedConfigurations);
      setSwitchStates((prevState) => ({
        ...prevState,
        [switchName]: !prevState[switchName],
      }));
    } catch (error) {
      console.error(`Erro ao atualizar a configuração ${switchName}:`, error);
    }
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
      </div>
    </LayoutPage>
  );
};

export default Setting;
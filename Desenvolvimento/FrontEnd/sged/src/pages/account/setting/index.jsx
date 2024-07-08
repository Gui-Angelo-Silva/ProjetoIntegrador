import React, { useEffect, useState } from 'react';
import LayoutPage from '../../../components/Layout/LayoutPage';
import Title from '../../../components/Title/Title';
import Switch from '../../../components/Switch/Switch';
import ConnectionService from '../../../object/service/connection';
import { useMontage } from '../../../object/modules/montage';
import ListModule from '../../../object/modules/list';

const Setting = () => {
  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, []);

  const connection = new ConnectionService();
  const list = ListModule();
  const [inOperation, setInOperation] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [settings, setSettings] = useState([]);
  const [switchStates, setSwitchStates] = useState({});

  const tipoConfiguracaoMap = {
    1: "Notificações",
    2: "Exibição",
    3: "Preferências"
  };

  const GetSettings = async () => {
    setInOperation(true);
    await connection.endpoint("Configuracao").get();
    const fetchedSettings = connection.getList();
    setSettings(fetchedSettings);

    const initialSwitchStates = fetchedSettings.reduce((acc, setting) => {
      acc[setting.id] = setting.valor;
      return acc;
    }, {});
    setSwitchStates(initialSwitchStates);
    setInOperation(false);
  };

  const EnableSetting = async (id) => {
    setInOperation(true);
    await connection.endpoint("Configuracao").data(id).action("Ativar").put(id);
    if (connection.response.status === 200) {
      setUpdateData(true);
    }
    setInOperation(false);
  };

  const DisableSetting = async (id) => {
    setInOperation(true);
    await connection.endpoint("Configuracao").data(id).action("Desativar").put(id);
    if (connection.response.status === 200) {
      setUpdateData(true);
    }
    setInOperation(false);
  };

  const handleSwitchChange = async (id) => {
    if (inOperation) return;

    const newSwitchStates = { ...switchStates, [id]: !switchStates[id] };
    setSwitchStates(newSwitchStates);

    const setting = settings.find(s => s.id === id);
    if (newSwitchStates[id]) {
      await EnableSetting(id); // Ativar configuração
    } else {
      await DisableSetting(id); // Desativar configuração
    }

    setUpdateData(true);
  };

  useEffect(() => {
    GetSettings();
  }, []);

  useEffect(() => {
    if (updateData) {
      GetSettings();
      setUpdateData(false);
    }
  }, [updateData]);

  const groupedSettings = settings.reduce((acc, setting) => {
    const tipo = setting.tipoConfiguracao;
    if (!acc[tipo]) acc[tipo] = [];
    acc[tipo].push(setting);
    return acc;
  }, {});

  return (
    <LayoutPage>
      <Title title="Configurações" />
      <div className="flex flex-col flex-grow mt-4 border-2 border-[#d8d8d8] rounded-lg pt-2 px-3 shadow-sm h-[800px]">
        <div className="bg-[#59C3D3]/25 px-3 py-[11px] rounded-lg">
          <h1 className="text-[#2D636B] text-xl">Geral</h1>
        </div>
        {Object.keys(groupedSettings).map(tipo => (
          <div key={tipo}>
            <div className="flex flex-col mt-6 px-3 gap-y-3 flex-grow">
              <h1 className="text-[#2D636B] text-xl">{tipoConfiguracaoMap[tipo]}</h1>
              {groupedSettings[tipo].map(setting => (
                <div className="flex w-full items-center gap-2" key={setting.id}>
                  <Switch
                    checked={switchStates[setting.id]}
                    onChange={() => handleSwitchChange(setting.id)}
                  />
                  <h2 className="text-lg text-[#636262]">{setting.descricao}</h2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </LayoutPage>
  );
};

export default Setting;
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.css"

import Pencil from '@mui/icons-material/EditOutlined';
import Blocked from '@mui/icons-material/EditOffOutlined';
import Trash from '@mui/icons-material/DeleteOutlined';
import Visible from '@mui/icons-material/VisibilityOutlined';
import NotVisible from '@mui/icons-material/VisibilityOffOutlined';

import { useMontage } from '../../../object/modules/montage';
import SessionService from '../../../object/service/session';
import ConnectionService from '../../../object/service/connection';
import UserClass from '../../../object/class/user';
import LoginClass from '../../../object/class/login';
import ControlModule from '../../../object/modules/control';
import Title from "../../../components/Title/Title";

export default function User() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, []);

  const session = SessionService();
  const connection = new ConnectionService();
  const user = UserClass();
  const login = LoginClass();
  const control = ControlModule();

  const [inEdit, setInEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inOperation, setInOperation] = useState('');
  const [sucessUpdate, setSucessUpdate] = useState(false);

  const openCloseEdit = (boolean) => {
    setInEdit(boolean);

    !boolean ? (GetUser(), user.clearError()) : undefined;
  };

  const GetUser = async () => {
    user.setData(await session.getUser());
  };

  const PutUser = async () => {
    setInOperation('Verificando Dados...');

    if (user.verifyData()) {
      setInOperation('Enviando Dados...');
      await connection.endpoint("Usuario").put(user.getData());

      if (!connection.response.status) { user.setError(connection.response.data); setInOperation(''); }
      else {
        setInOperation('Atualizando Sessão...');

        login.setPersonEmail(user.personEmail);
        login.setUserPassword(user.userPassword);

        setSucessUpdate('Sucesso');
      }
    } else {
      console.log('Dados inválidos!');
      setInOperation('');
    }
  };

  useEffect(() => {
    GetUser();

    const getDataLogin = () => {
      const data = session.getLogin();

      if (data) {
        login.setPersistLogin(true);
      }

    }; getDataLogin();
  }, []);

  useEffect(() => {
    const UpdateSession = async () => {
      if (sucessUpdate === 'Sucesso') {
        await session.closeSession();

        const response = await session.createSession(login);

        if (response.validation) {
          setSucessUpdate(true);
          openCloseEdit(false);

        } else {
          console.log(response.message);
        }

      }; setInOperation('');

    }; UpdateSession();
  }, [sucessUpdate]);

  const clearField = (attribute) => {
    user[attribute] instanceof Function ? user[attribute]('') : console.log(`O atributo ${attribute} não existe!`);
  };

  return (
    <>
      <Title title={inEdit ? "Editar Dados" : "Perfil"} />
      <div className="flex">
        <div className="flex relative justify-center lg:flex col-span-1">
          <div className="">
            <input className="hidden"
              id="fileInput"
              type="file"
              onChange={(e) => user.insertPicture(e.target.files[0])}
            />
            <img
              src={user.personPicture ? user.personPicture : user.defaultPicture}
              className="cursor-pointer rounded-full ml-3 w-[150px] h-[150px] md:h-[175px] md:w-[175px] xl:w-[200px] xl:h-[200px] lg:mt-6 lg:mx-14 object-cover border-[1px] border-[#dbdbdb] shadow-md"

              title="Selecionar Imagem"
              onClick={(e) => inEdit ? user.handleImageClick('') : undefined}
            />
            {user.addImage && inEdit && (
              <img
                src={user.closeIcon}
                className="absolute top-[5px] cursor-pointer object-cover h-5 w-5 rounded-full"
                style={{
                  left: 'calc(50% + 80px)', // Centralizando horizontalmente e adicionando 100px à esquerda após o meio
                  transform: 'translate(-50%, -50%)'
                }}
                onClick={(e) => user.removePicture('')}
              />
            )}
            <h1 className="text-center text-[15px] lg:text-[20px] text-[#636262] pb-1 pt-2">{user.personName}</h1>
            <h3 className="text-center text-[13px] lg:text-[16px] text-[#636262]">{user.personEmail}</h3>
          </div>
        </div>
        <br /><br />
        <div className="md:border-2 md:rounded-xl md:p-8">
          <div className="lg:w-[700px] xl:w-[900px] rounded-lg md:grid md:grid-cols-1 lg:grid lg:grid-cols-2">
            <div className="flex-col justify-center">
              <label className="text-[15px] text-[#4E4D4D]">Nome:</label>
              <div className="relative w-fit">
                <div className="flex items-center">
                  <input type="text" className={`form-control rounded-md caret-red-500 border-[#BCBCBC] text-[14px] text-[#636262] pr-12 ${inEdit ? "w-[260px]" : "w-[300px]"}`} readOnly={!inEdit} name="nomePessoa" placeholder="Informe o nome . . ." onChange={(e) => user.setPersonName(e.target.value)} value={user.personName} />
                  {inEdit ?
                    <>
                      <Pencil className="absolute top-[50%] opacity-50 right-2 translate-y-[-50%]" />
                      {user.personName &&
                        <Trash className="text-red-500 absolute top-[50%] -right-12 cursor-pointer translate-y-[-50%] border-1 border-solid border-red-500 rounded-sm" style={{ fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setPersonName')}
                        />
                      }
                    </> :
                    <Blocked className="absolute top-[50%] right-2 translate-y-[-50%] opacity-50" />
                  }
                </div>
              </div>
              <div className="error-message text-[14px] text-red-500">
                {user.errorPersonName}
              </div>
              <br />
              <label className="text-[15px] text-[#4E4D4D]">E-mail:</label>
              <div className="relative w-fit">
                <div className="flex items-center">
                  <input type="text" className={`form-control rounded-md border-[#BCBCBC] text-[14px] text-[#636262] pr-12 ${inEdit ? "w-[260px]" : "w-[300px]"}`} readOnly={!inEdit} name="emailPessoa" placeholder="Informe o e-mail . . ." onChange={(e) => user.setPersonEmail(e.target.value.toLowerCase())} value={user.personEmail} />
                  {inEdit ?
                    <>
                      <Pencil className="absolute top-[50%] opacity-50 right-2 translate-y-[-50%]" />
                      {user.personEmail &&
                        <Trash className="text-red-500 absolute top-[50%] -right-12 cursor-pointer translate-y-[-50%] border-1 border-solid border-red-500 rounded-sm" style={{ fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setPersonEmail')}
                        />
                      }
                    </> :
                    <Blocked className="absolute top-[50%] right-2 translate-y-[-50%] opacity-50" />
                  }
                </div>
              </div>
              <div className="error-message text-[14px] text-red-500">
                {user.errorPersonEmail}
              </div>
              <br />
              <label className="text-[15px] text-[#4E4D4D]">Senha:</label>
              <div className="relative w-fit">
                <div className="flex items-center">
                  <input type={isVisible ? "text" : "password"} className={`form-control rounded-md border-[#BCBCBC] text-[14px] text-[#636262] pr-12 ${inEdit ? "w-[260px]" : "w-[300px]"}`} readOnly={!inEdit} name="senhaUsuario" placeholder="Informe a senha . . ." onChange={(e) => user.setUserPassword(e.target.value)} value={user.userPassword} />
                  {inEdit ?
                    <>
                      {isVisible ? (
                        <Visible className="absolute top-[50%] right-10 translate-y-[-50%] opacity-50" onClick={(e) => setIsVisible(false)} />
                      ) : (
                        <NotVisible className="absolute top-[50%] right-10 translate-y-[-50%] opacity-50" onClick={(e) => setIsVisible(true)} />
                      )}

                      <Pencil className="absolute top-[50%] opacity-50 right-2 translate-y-[-50%]" />
                      {user.userPassword &&
                        <Trash className="text-red-500 absolute top-[50%] -right-12 cursor-pointer translate-y-[-50%] border-1 border-solid border-red-500 rounded-sm" style={{ fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setUserPassword')}
                        />
                      }
                    </> :
                    <>
                      <Blocked className="absolute top-[50%] right-2 translate-y-[-50%] opacity-50" />
                    </>
                  }
                </div>
              </div>
              <div className="error-message text-[14px] text-black">
                {inEdit ? user.passwordStrength : null}
              </div>
              <div className="error-message text-[14px] text-red-500">
                {user.errorUserPassword}
              </div>
              <br />
              <label className="text-[15px] text-[#4E4D4D]">Cargo:</label>
              <div className="relative w-fit">
                <div className="flex items-center">
                  <input type="text" className={`form-control rounded-md border-[#BCBCBC] text-[14px] text-[#636262] pr-12 ${inEdit ? "w-[260px]" : "w-[300px]"}`} readOnly={!inEdit} name="cargoUsuario" placeholder="Informe o cargo . . ." onChange={(e) => user.setUserOffice(e.target.value)} value={user.userOffice} />
                  {inEdit ?
                    <>
                      <Pencil className="absolute top-[50%] opacity-50 right-2 translate-y-[-50%]" />
                      {user.userOffice &&
                        <Trash className="text-red-500 absolute top-[50%] -right-12 cursor-pointer translate-y-[-50%] border-1 border-solid border-red-500 rounded-sm" style={{ fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setUserOffice')}
                        />
                      }
                    </> :
                    <Blocked className="absolute top-[50%] right-2 translate-y-[-50%] opacity-50" />
                  }
                </div>
              </div>
              <div className="error-message text-[14px] text-red-500">
                {user.errorUserOffice}
              </div>
              <br />
              <label className="text-[15px] text-[#4E4D4D]">Telefone: </label>
              <div className="relative w-fit">
                <div className="flex items-center">
                  <input type="text" className={`form-control rounded-md border-[#BCBCBC] text-[14px] text-[#636262] pr-12 ${inEdit ? "w-[260px]" : "w-[300px]"}`} readOnly={!inEdit} name="telefonePessoa" onKeyDown={control.handleKeyDown} placeholder="Informe o telefone . . ." onChange={(e) => user.handlePhone(e.target.value)} value={user.personTelephone} />
                  {inEdit ?
                    <>
                      <Pencil className="absolute top-[50%] opacity-50 right-2 translate-y-[-50%]" />
                      {user.personTelephone &&
                        <Trash className="text-red-500 absolute top-[50%] -right-12 cursor-pointer translate-y-[-50%] border-1 border-solid border-red-500 rounded-sm" style={{ fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setPersonTelephone')}
                        />
                      }
                    </> :
                    <Blocked className="absolute top-[50%] right-2 translate-y-[-50%] opacity-50" />
                  }
                </div>
              </div>
              <div className="error-message text-[14px] text-red-500">
                {user.errorPersonTelephone}
              </div>
              <br />
            </div>
            <div>
              <label className="text-[15px] text-[#4E4D4D]">CPF / CNPJ: </label>
              <br />
              <select className={`form-control rounded-md border-[#BCBCBC] text-[14px] text-[#636262] pr-12 w-[300px]`} onChange={(e) => user.setIdentifyCpfCnpj(e.target.value)} value={user.identifyCpfCnpj} >
                <option key="cpf" value="cpf">
                  CPF
                </option>
                <option key="cnpj" value="cnpj">
                  CNPJ
                </option>
              </select>
              <br />
              <div className="relative w-fit">
                <div className="flex items-center">
                  <input type="text" className={`form-control rounded-md border-[#BCBCBC] text-[14px] text-[#636262] pr-12 ${inEdit ? "w-[260px]" : "w-[300px]"}`} readOnly={!inEdit} name="cpfCnpjPessoa" placeholder={`Informe o ${user.identifyCpfCnpj} . . .`} onChange={(e) => user.handleCpfCnpj(e.target.value)} value={user.personCpfCnpj} />
                  {inEdit ?
                    <>
                      <Pencil className="absolute top-[50%] opacity-50 right-2 translate-y-[-50%]" />
                      {user.personCpfCnpj &&
                        <Trash className="text-red-500 absolute top-[50%] -right-12 cursor-pointer translate-y-[-50%] border-1 border-solid border-red-500 rounded-sm" style={{ fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setPersonCpfCnpj')}
                        />
                      }
                    </> :
                    <Blocked className="absolute top-[50%] right-2 translate-y-[-50%] opacity-50" />
                  }
                </div>
              </div>
              <div className="error-message text-[14px] text-red-500">
                {user.errorPersonCpfCnpj}
              </div>
              <br />
              <label className="text-[15px] text-[#4E4D4D]">RG / IE: </label>
              <br />
              <select className={`form-control rounded-md border-[#BCBCBC] text-[14px] text-[#636262] pr-12 w-[300px]`} onChange={(e) => user.setIdentifyRgIe(e.target.value)} value={user.identifyRgIe}>
                <option key="rg" value="rg">
                  RG
                </option>
                <option key="ie" value="ie">
                  IE
                </option>
              </select>
              <br />
              <div className="relative w-fit">
                <div className="flex items-center">
                  <input type="text" className={`form-control rounded-md border-[#BCBCBC] text-[14px] text-[#636262] pr-12 ${inEdit ? "w-[260px]" : "w-[300px]"}`} readOnly={!inEdit} name="rgIePessoa" placeholder={`Informe o ${user.identifyRgIe} . . .`} onChange={(e) => user.handleRgIe(e.target.value)} value={user.personRgIe} />
                  {inEdit ?
                    <>
                      <Pencil className="absolute top-[50%] opacity-50 right-2 translate-y-[-50%]" />
                      {user.personRgIe &&
                        <Trash className="text-red-500 absolute top-[50%] -right-12 cursor-pointer translate-y-[-50%] border-1 border-solid border-red-500 rounded-sm" style={{ fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setPersonRgIe')}
                        />
                      }
                    </> :
                    <Blocked className="absolute top-[50%] right-2 translate-y-[-50%] opacity-50" />
                  }
                </div>
              </div>
              <div className="error-message text-[14px] text-red-500">
                {user.errorPersonRgIe}
              </div>
            </div>
            <br />
            <br />
          </div>
          <div className="flex justify-center">
            {inEdit ? (
              <>
                <button
                  className="btn bg-none border-[#D93442] text-[#D93442] hover:bg-[#D93442] hover:text-white"
                  style={{ width: '100px', height: '40px', marginRight: '30px' }}
                  onClick={() => openCloseEdit(false)}
                >
                  Cancelar
                </button>
                <button
                  className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#F2BE05] text-white hover:text-white hover:bg-[#A8860B]'}`}
                  style={{ width: '100px', height: '40px' }}
                  onClick={() => inOperation ? null : PutUser()}
                  disabled={inOperation ? true : false}
                >
                  {inOperation ? inOperation : 'Atualizar'}
                </button>
              </>
            ) : (
              <>
                <button
                  className="w-[130px] h-[48px] text-[15px] bg-[#2D636B] text-white rounded-lg"
                  style={{ width: '150px', height: '40px' }}
                  onClick={() => openCloseEdit(true)}
                >
                  Habilitar Edição
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={sucessUpdate === true ? true : false}>
        <ModalHeader className="justify-center text-[#444444] text-2xl font-medium">Atenção!</ModalHeader>
        <ModalBody className="justify-center">
          <div className="flex flex-row justify-center p-2" style={{ textAlign: 'center' }}>
            A página será recarregada para atualizar as informações.
            <br />
            Clique no botão abaixo para recarrega-la.
          </div>
          <div className="flex justify-center gap-2 pt-3">
            <button className={'btn bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'} style={{ width: '100px', height: '40px' }} onClick={() => window.location.reload()} > Recarregar </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
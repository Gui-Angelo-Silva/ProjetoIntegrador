import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "../../../routeA/components/SideBar";
import NavBar from "../../../routeA/components/NavBar";

import Pencil from '@mui/icons-material/EditOutlined';
import Blocked from '@mui/icons-material/EditOffOutlined';
import Trash from '@mui/icons-material/DeleteOutlined';
import Visible from '@mui/icons-material/VisibilityOutlined';
import NotVisible from '@mui/icons-material/VisibilityOffOutlined';

import { useMontage } from '../../../../object/modules/montage';
import SessionService from '../../../../object/service/session';
import ConnectionService from '../../../../object/service/connection';
import UserClass from '../../../../object/class/user';
import LoginClass from '../../../../object/class/login';
import ListModule from '../../../../object/modules/list';
import ControlModule from '../../../../object/modules/control';

export default function User() {

  const { componentMounted } = useMontage();

  useEffect(() => {
    componentMounted();
  }, []);

  const session = SessionService();
  const connection = ConnectionService();
  const user = UserClass();
  const login = LoginClass();
  const list = ListModule();
  const control = ControlModule();

  const [inEdit, setInEdit] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [inOperation, setInOperation] = useState('');
  const [sucessUpdate, setSucessUpdate] = useState(false);

  const openCloseEdit = (boolean) => {
    setInEdit(boolean);

    !boolean ? (selectUser(), user.clearError()) : undefined;
  };

  const selectUser = () => {
    const object = session.getSession();
    user.getData(object);
  };

  const GetUser = async () => {
    const response = await connection.objectUrl("Usuario").getOrder();
    if (response.status) {
      list.setList(response.data);
    } else {
      console.log(response.message);
    }
  };

  const PutUser = async () => {
    setInOperation('Verificando Dados...');

    if (user.verifyData()) {
      setInOperation('Enviando Dados...');
      let response = await connection.objectUrl("Usuario").putOrder(user);

      if (!response.status) { user.getError(response.data); setInOperation(''); }
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
    selectUser();

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

  useEffect(() => {
    console.log(user.personPicture);
  }, [user.personPicture]);

  const clearField = (attribute) => {
    user[attribute] instanceof Function ? user[attribute]('') : console.log(`O atributo ${attribute} não existe!`);
  };

  return (
    <div className="flex flex-1 min-h-screen">
      <div className="h-full w-full" style={{ display: 'flex', flexDirection: 'column' }}>
        <NavBar /> {/* NavBar no topo */}
        <div className="flex flex-1 min-h-full">
          <SideBar />
          <div className="min-h-screen" style={{ flex: 2, marginLeft: '80px', marginRight: '40px', marginTop: -5 }}>
            <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)', marginBottom: '5000px' }}>
              <br />
              <h3 className="text-2xl font-semibold text-gray-600">Editar Usuário</h3>
              <br /><br />
              <div className="form-group">
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => user.insertPicture(e.target.files[0])}
                  />
                  <img
                    src={user.personPicture ? user.personPicture : user.defaultPicture}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                      width: '200px', // ajuste o tamanho da imagem conforme necessário
                      height: '200px', // ajuste o tamanho da imagem conforme necessário
                      objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                      boxShadow: '0 0 0 3px white, 0 0 0 5px black', // Adicionando uma borda branca (interna) e uma borda preta (externa)
                    }}
                    title="Selecionar Imagem"
                    onClick={(e) => inEdit ? user.handleImageClick('') : undefined}
                  />
                  {user.addImage && inEdit && (
                    <img
                      src={user.closeIcon}
                      style={{
                        position: 'absolute',
                        top: '5px', // Distância do topo
                        left: 'calc(50% + 150px)', // Centralizando horizontalmente e adicionando 100px à esquerda após o meio
                        transform: 'translate(-50%, -50%)', // Centralizando completamente
                        cursor: 'pointer',
                        borderRadius: '50%', // para fazer a imagem ter bordas arredondadas
                        width: '20px', // ajuste o tamanho da imagem conforme necessário
                        height: '20px', // ajuste o tamanho da imagem conforme necessário
                        objectFit: 'cover', // para garantir que a imagem seja totalmente coberta pelo círculo
                      }}
                      onClick={(e) => user.removePicture('')}
                    />
                  )}
                </div>
                <br /><br />
                <label>Nome:</label>
                <div style={{ position: 'relative', width: 'fit-content' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly={!inEdit} name="nomePessoa" placeholder="Informe o nome . . ." onChange={(e) => user.setPersonName(e.target.value)} value={user.personName} style={{ paddingRight: '3rem', width: '900px' }}
                    />
                    {inEdit ?
                      <>
                        <Pencil style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                        {user.personName &&
                          <Trash style={{ color: 'red', position: 'absolute', top: '50%', right: '-3rem', transform: 'translateY(-50%)', cursor: 'pointer', border: '1px solid red', borderRadius: '5px', fontSize: '42px', padding: '7px', }}
                            onClick={(e) => clearField('setPersonName')}
                          />
                        }
                      </> :
                      <Blocked style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                    }
                  </div>
                </div>
                <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                  {user.errorPersonName}
                </div>
                <br />
                <label>E-mail:</label>
                <div style={{ position: 'relative', width: 'fit-content' }}>
                  <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly={!inEdit} name="emailPessoa" placeholder="Informe o e-mail . . ." onChange={(e) => user.setPersonEmail(e.target.value.toLowerCase())} value={user.personEmail} style={{ paddingRight: '3rem', width: '900px' }} />
                  {inEdit ?
                    <>
                      <Pencil style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                      {user.personEmail &&
                        <Trash style={{ color: 'red', position: 'absolute', top: '50%', right: '-3rem', transform: 'translateY(-50%)', cursor: 'pointer', border: '1px solid red', borderRadius: '5px', fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setPersonEmail')}
                        />
                      }
                    </> :
                    <Blocked style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                  }
                </div>
                <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                  {user.errorPersonEmail}
                </div>
                <br />
                <label>Senha:</label>
                <div style={{ position: 'relative', width: 'fit-content' }}>
                  <input type={isVisible ? "text" : "password"} className="form-control rounded-md border-[#BCBCBC]" readOnly={!inEdit} name="senhaUsuario" placeholder="Informe a senha . . ." onChange={(e) => user.setUserPassword(e.target.value)} value={user.userPassword} style={{ paddingRight: '5rem', width: '900px' }} />
                  {inEdit ?
                    <>
                      {isVisible ? (
                        <Visible style={{ position: 'absolute', top: '50%', right: '2.5rem', transform: 'translateY(-50%)', opacity: '0.5' }} onClick={(e) => setIsVisible(false)} />
                      ) : (
                        <NotVisible style={{ position: 'absolute', top: '50%', right: '2.5rem', transform: 'translateY(-50%)', opacity: '0.5' }} onClick={(e) => setIsVisible(true)} />
                      )}

                      <Pencil style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                      {user.userPassword &&
                        <Trash style={{ color: 'red', position: 'absolute', top: '50%', right: '-3rem', transform: 'translateY(-50%)', cursor: 'pointer', border: '1px solid red', borderRadius: '5px', fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setUserPassword')}
                        />
                      }
                    </> :
                    <>
                      <Blocked style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                    </>
                  }
                </div>
                <div className="error-message" style={{ fontSize: '14px', color: 'black' }}>
                  {inEdit ? user.passwordStrength : null}
                </div>
                <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                  {user.errorUserPassword}
                </div>
                <br />
                <label>Cargo:</label>
                <div style={{ position: 'relative', width: 'fit-content' }}>
                  <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly={!inEdit} name="cargoUsuario" placeholder="Informe o cargo . . ." onChange={(e) => user.setUserOffice(e.target.value)} value={user.userOffice} style={{ paddingRight: '3rem', width: '900px' }} />
                  {inEdit ?
                    <>
                      <Pencil style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                      {user.userOffice &&
                        <Trash style={{ color: 'red', position: 'absolute', top: '50%', right: '-3rem', transform: 'translateY(-50%)', cursor: 'pointer', border: '1px solid red', borderRadius: '5px', fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setUserOffice')}
                        />
                      }
                    </> :
                    <Blocked style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                  }
                </div>
                <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                  {user.errorUserOffice}
                </div>
                <br />
                <label className="text-[#444444]">Telefone: </label>
                <div style={{ position: 'relative', width: 'fit-content' }}>
                  <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly={!inEdit} name="telefonePessoa" onKeyDown={control.handleKeyDown} placeholder="Informe o telefone . . ." onChange={(e) => user.handlePhone(e.target.value)} value={user.personTelephone} style={{ paddingRight: '3rem', width: '900px' }} />
                  {inEdit ?
                    <>
                      <Pencil style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                      {user.personTelephone &&
                        <Trash style={{ color: 'red', position: 'absolute', top: '50%', right: '-3rem', transform: 'translateY(-50%)', cursor: 'pointer', border: '1px solid red', borderRadius: '5px', fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setPersonTelephone')}
                        />
                      }
                    </> :
                    <Blocked style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                  }
                </div>
                <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                  {user.errorPersonTelephone}
                </div>
                <br />
                <label>CPF / CNPJ: </label>
                <br />
                <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setIdentifyCpfCnpj(e.target.value)} value={user.identifyCpfCnpj} style={{ width: '900px' }}>
                  <option key="cpf" value="cpf">
                    CPF
                  </option>
                  <option key="cnpj" value="cnpj">
                    CNPJ
                  </option>
                </select>
                <br />
                <div style={{ position: 'relative', width: 'fit-content' }}>
                  <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly={!inEdit} name="cpfCnpjPessoa" placeholder={`Informe o ${user.identifyCpfCnpj} . . .`} onChange={(e) => user.handleCpfCnpj(e.target.value)} value={user.personCpfCnpj} style={{ paddingRight: '3rem', width: '900px' }} />
                  {inEdit ?
                    <>
                      <Pencil style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                      {user.personCpfCnpj &&
                        <Trash style={{ color: 'red', position: 'absolute', top: '50%', right: '-3rem', transform: 'translateY(-50%)', cursor: 'pointer', border: '1px solid red', borderRadius: '5px', fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setPersonCpfCnpj')}
                        />
                      }
                    </> :
                    <Blocked style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                  }
                </div>
                <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                  {user.errorPersonCpfCnpj}
                </div>
                <br />
                <label>RG / IE: </label>
                <br />
                <select className="form-control rounded-md border-[#BCBCBC]" onChange={(e) => user.setIdentifyRgIe(e.target.value)} value={user.identifyRgIe} style={{ width: '900px' }}>
                  <option key="rg" value="rg">
                    RG
                  </option>
                  <option key="ie" value="ie">
                    IE
                  </option>
                </select>
                <br />
                <div style={{ position: 'relative', width: 'fit-content' }}>
                  <input type="text" className="form-control rounded-md border-[#BCBCBC]" readOnly={!inEdit} name="rgIePessoa" placeholder={`Informe o ${user.identifyRgIe} . . .`} onChange={(e) => user.handleRgIe(e.target.value)} value={user.personRgIe} style={{ paddingRight: '3rem', width: '900px' }} />
                  {inEdit ?
                    <>
                      <Pencil style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                      {user.personRgIe &&
                        <Trash style={{ color: 'red', position: 'absolute', top: '50%', right: '-3rem', transform: 'translateY(-50%)', cursor: 'pointer', border: '1px solid red', borderRadius: '5px', fontSize: '42px', padding: '7px', }}
                          onClick={(e) => clearField('setPersonRgIe')}
                        />
                      }
                    </> :
                    <Blocked style={{ position: 'absolute', top: '50%', right: '0.5rem', transform: 'translateY(-50%)', opacity: '0.5', }} />
                  }
                </div>
                <div className="error-message" style={{ fontSize: '14px', color: 'red' }}>
                  {user.errorPersonRgIe}
                </div>
                <br />
              </div>
              <br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                      className={`btn ${inOperation ? 'border-[#E0E0E0] text-[#A7A6A5] hover:text-[#A7A6A5]' : 'bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}`}
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
                      className={'btn bg-[#2AA646] text-white hover:text-white hover:bg-[#059669]'}
                      style={{ width: '150px', height: '40px' }}
                      onClick={() => openCloseEdit(true)}
                    >
                      Habilitar Edição
                    </button>
                  </>
                )}
              </div>
              <br /><br /><br /><br /><br />
            </div>
          </div>
        </div >
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
      </div >
    </div >
  );
}
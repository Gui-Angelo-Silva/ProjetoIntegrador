import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import "../City/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function City() {
    const baseUrl = "https://localhost:7096/api/Cidade";

    const [data, setData] = useState([]);
    const [dataState, setDataState] = useState([]);
    const [modalInsert, setModalInsert] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [updateData, setUpdateData] = useState(true);
    const [cityName, setCityName] = useState("");
    const [idState, setIdState] = useState("");
    const [cityId, setCityId] = useState("");
    const [selectCity] = useState({
        id: "",
        nomeCidade: "",
        idEstado: "",
    });

    const CitySelect = (city, option) => {
        setCityId(city.id);
        setCityName(city.nomeCidade);
        setIdState(city.idEstado);

        if (option === "Editar") {
            openCloseModalEdit();
        } else {
            openCloseModalDelete();
        }
    };

    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert);
    };

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
    };

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);
    };

    const GetOrder = async () => {
        await axios
            .get(baseUrl)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const GetOrderState = async () => {
        await axios
            .get("https://localhost:7096/api/Estado")
            .then((response) => {
                setDataState(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const PostOrder = async () => {
        await axios
            .post(baseUrl, { nomeCidade: cityName, idEstado: idState })
            .then((response) => {
                setData([...data, response.data]);
                openCloseModalInsert();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const PutOrder = async () => {
        await axios
            .put(baseUrl, {
                id: cityId,
                nomeCidade: cityName,
                idEstado: idState,
            })
            .then((response) => {
                setData((previousData) =>
                    previousData.map((city) =>
                        city.id === selectCity.id
                            ? { ...city, nomeCidade: response.data.nomeCidade }
                            : city
                    )
                );
                openCloseModalEdit();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const DeleteOrder = async () => {
        await axios
            .delete(baseUrl + "/" + cityId)
            .then(() => {
                setData((previousData) =>
                    previousData.filter((city) => city.id !== cityId)
                );
                openCloseModalDelete();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        if (updateData) {
            GetOrder();
            GetOrderState();
            setUpdateData(false);
        }
    }, [updateData]);

    return (
        <div className="city-container">
            <br />
            <h3>Lista de Cidade</h3>
            <header>
                <button
                    className="btn btn-success"
                    onClick={() => openCloseModalInsert()}
                >
                    Adicionar
                </button>
            </header>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Estado</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((city) => {
                        const estado = dataState.find((state) => state.id === city.idEstado);

                        return (
                            <tr key={city.id}>
                                <td>{city.nomeCidade}</td>
                                <td>{estado ? estado.nomeEstado : "Estado não encontrado"}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => CitySelect(city, "Editar")}
                                    >
                                        Editar
                                    </button>{" "}
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => CitySelect(city, "Excluir")}
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Modal isOpen={modalInsert}>
                <ModalHeader>Cadastrar Cidade</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) => setCityName(e.target.value)}
                        />
                        <br />
                        <label>Estado:</label>
                        <br />
                        <select className="form-control" onChange={(e) => setIdState(e.target.value)}>
                            {dataState.map((state) => (
                                <option key={state.id} value={state.id}>
                                    {state.nomeEstado}
                                </option>
                            ))}
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => PostOrder()}>
                        Cadastrar
                    </button>{" "}
                    <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit}>
                <ModalHeader>Editar Cidade</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            value={cityId}
                        />
                        <br />
                        <label>Nome:</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nomeCidade"
                            onChange={(e) => setCityName(e.target.value)}
                            value={cityName}
                        />
                        <br />
                        <label>Estado:</label>
                        <br />
                        <select className="form-control" onChange={(e) => setIdState(e.target.value)}>
                            {dataState.map((state) => (
                                <option
                                    key={state.id}
                                    value={state.id}
                                    selected={state.id === idState}
                                >
                                    {state.nomeEstado}
                                </option>
                            ))}
                        </select>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => PutOrder()}>
                        Atualizar
                    </button>{" "}
                    <button className="btn btn-danger" onClick={() => openCloseModalEdit()}>
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Confirma a exclusão desta Cidade: {selectCity && selectCity.nome} ?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => DeleteOrder()}>
                        Sim
                    </button>
                    <button className="btn btn-danger" onClick={() => openCloseModalDelete()}>
                        Não
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
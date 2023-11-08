import React, { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from "axios"
import '../City/index.css'
import "bootstrap/dist/css/bootstrap.min.css"

export default function City() {

    const baseUrl = "https://localhost:7096/api/Cidade"

    const [data, setData] = useState([])

    const [modalInsert, setModalInsert] = useState(false)

    const [modalEdit, setModalEdit] = useState(false)

    const [modalDelete, setModalDelete] = useState(false)

    const [updateData, setUpdateData] = useState(true)

    const [cityName, setCityName] = useState("");

    const [cityId, setCityId] = useState("");

    const [selectCity, setSelectCity] = useState({
        id: "",
        nomeCidade: ""
    })

    const CitySelect = (city, option) => {
        setCityId(city.id)
        setCityName(city.nomeCidade)

        if (option === "Editar") {
            openCloseModalEdit();
        }
        else {
            openCloseModalDelete();
        }
    }

    const openCloseModalInsert = () => {
        setModalInsert(!modalInsert);
    }

    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
    }

    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);
    }

    const GetOrder = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    const PostOrder = async () => {
        delete selectCity.id
        await axios.post(baseUrl, { nomeCidade: cityName})
            .then(response => {
                setData(data.concat(response.data));
                openCloseModalInsert();
            }).catch(error => {
                console.log(error);
            })
    }

    async function PutOrder(){
        delete selectCity.id
        await axios.put(baseUrl, { id: cityId, nomeCidade: cityName})
            .then(response => {
                var answer = response.data
                var aux = data
                aux.map(city => {
                    if (city.id === selectCity.id) {
                        city.nomeCidade = answer.nomeCidade
                    }
                })
                openCloseModalEdit();
            }).catch(error => {
                console.log(error)
            })
    }

    const DeleteOrder = async () => {
        await axios.delete(baseUrl + "/" + cityId)
            .then(response => {
                setData(data.filter(city => city.id !== response.data));
                openCloseModalDelete();
            }).catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (updateData) {
            GetOrder();
            setUpdateData(false);
        }
    }, [updateData])

    return (
        <div className="city-container">
            <br />
            <h3>Lista de Cidade</h3>
            <header>
                <button className="btn btn-success" onClick={() => openCloseModalInsert()}>Adicionar</button>
            </header>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(city => (
                        <tr key={city.id}>
                            <td>{city.id}</td>
                            <td>{city.nomeCidade}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => CitySelect(city, "Editar")}>Editar</button>{"  "}
                                <button className="btn btn-danger" onClick={() => CitySelect(city, "Excluir")}>Remover</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={modalInsert}>
                <ModalHeader>Cadastrar Cidade</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input type="text" className="form-control" onChange={(e) => setCityName(e.target.value)} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => PostOrder()}>Cadastrar</button>{"  "}
                    <button className="btn btn-danger" onClick={() => openCloseModalInsert()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalEdit}>
                <ModalHeader>Editar Cidade</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>ID: </label><br />
                        <input type="text" className="form-control" readOnly value={cityId} /> <br />

                        <label>Nome:</label>
                        <input type="text" className="form-control" name="nomeCidade" onChange={(e) => setCityName(e.target.value)}
                            value={cityName} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => PutOrder()}>Cadastrar</button>{"  "}
                    <button className="btn btn-danger" onClick={() => openCloseModalEdit()}>Cancelar</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Confirma a exclusão deste Cidade : {selectCity && selectCity.nome} ?
                </ModalBody>
                <ModalFooter>
                    <button className='btn btn-primary' onClick={() => DeleteOrder()}>Sim</button>
                    <button className='btn btn-danger' onClick={() => openCloseModalDelete()}>Não</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
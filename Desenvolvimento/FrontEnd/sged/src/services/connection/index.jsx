import axios from "axios";
import { useSession } from '../../../../services/session';
import { useApi } from '../../../../services/api';

export default function Connection(url) {

    const { getAuthConfig } = useSession();
    const { appendRoute } = useApi();
    const objectUrl = appendRoute(url);
    
    const GetOrder = async () => {
        await axios.get(objectUrl, getAuthConfig())
            .then(response => {
                setData(response.data)
            }).catch(error => {
                console.log(error);
            })
    }

    const PostOrder = async () => {
        var response = await verificarDados();
        if (response) {

            delete selectState.id
            await axios.post(objectUrl, { nomeEstado: stateName, ufEstado: stateUf }, getAuthConfig())
                .then(response => {
                    setData(prevData => [...prevData, response.data]);
                    openCloseModalInsert();
                    setUpdateData(true);
                }).catch(error => {
                    console.log(error);
                })

        }
    };

    const PutOrder = async () => {
        var response = await verificarDados();
        if (response) {

            delete selectState.id
            await axios.put(objectUrl, { id: stateId, nomeEstado: stateName, ufEstado: stateUf }, getAuthConfig())
                .then(response => {
                    var answer = response.data
                    var aux = data
                    aux.map(state => {
                        if (state.id === selectState.id) {
                            state.nomeEstado = answer.nomeEstado
                            state.ufEstado = answer.ufEstado
                        }
                    })

                    const updatedState = response.data;

                    setData((prevData) => {
                        return prevData.map((state) => {
                            if (state.id === stateId) {
                                return updatedState;
                            }
                            return state;
                        });
                    });

                    openCloseModalEdit();
                    setUpdateData(true);
                }).catch(error => {
                    console.log(error)
                })

        }
    };

    const DeleteOrder = async () => {
        await axios.delete(objectUrl + stateId, getAuthConfig())
            .then(response => {
                setData(data.filter(state => state.id !== response.data));
                openCloseModalDelete();
                setUpdateData(true);
            }).catch(error => {
                console.log(error);
            })
    };

}
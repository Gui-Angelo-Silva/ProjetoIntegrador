import axios from "axios";
import { useSession } from '../../../object/service/session';
import { useApi } from '../../../object/service/api';

function ConnectionEntity(url) {
    const { getAuthConfig } = useSession();
    const { appendRoute } = useApi();
    const objectUrl = appendRoute(url);

    async function getOrder() {
        try {
            const response = await axios.get(objectUrl, getAuthConfig());
            if (response.status === 200) {
                return { status: true, message: response.data };
            } else {
                return { status: false, message: 'Erro ao processar a requisição.' };
            }
        } catch (error) {
            return { status: false, message: error };
        }
    }

    async function postOrder(object) {
        var response = await object.verifyData();
        if (response) {
            const data = object.setData();
            delete data.id;

            try {
                response = await axios.post(objectUrl, data, getAuthConfig());
                if (response.status === 201) {
                    object.getData(response);
                    return { status: true, message: 'Registro ' + object.propertyName() + ' cadastrado com sucesso.' };
                } else {
                    return { status: false, message: 'Erro ao processar a requisição!' };
                }
            } catch (error) {
                return { status: false, message: error };
            }
        } else {
            return { status: false, message: 'Dados inválidos!' };
        }
    }

    async function putOrder(object) {
        var response = await object.verifyData();
        if (response) {
            const data = object.setData();

            try {
                response = await axios.put(objectUrl, data, getAuthConfig());
                if (response.status === 200) {
                    object.getData(response);
                    return { status: true, message: 'Registro ' + object.propertyName() + ' alterado com sucesso.' };
                } else {
                    return { status: false, message: 'Erro ao processar a requisição!' };
                }
            } catch (error) {
                return { status: false, message: error };
            }
        } else {
            return { status: false, message: 'Dados inválidos!' };
        }
    }

    async function deleteOrder(object) {
        const data = object.setData();
        try {
            const response = await axios.delete(objectUrl + data.id, getAuthConfig());
            if (response.status === 200) {
                return { status: true, message: 'Registro ' + object.propertyName() + ' excluído com sucesso.' };
            } else {
                return { status: false, message: 'Erro ao processar a requisição.' };
            }
        } catch (error) {
            return { status: false, message: error };
        }
    }

    return { getOrder, postOrder, putOrder, deleteOrder };
}

export default ConnectionEntity;
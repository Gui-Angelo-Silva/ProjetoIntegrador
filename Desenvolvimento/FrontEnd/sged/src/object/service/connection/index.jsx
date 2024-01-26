import axios from "axios";
import { useSession } from '../../../object/service/session';
import { useApi } from '../../../object/service/api';

function ConnectionEntity(url) {
    const { getAuthConfig } = useSession();
    const { appendRoute } = useApi();
    const objectUrl = appendRoute(url);
    const statusArray = [200, 201];

    async function getOrder() {
        try {
            const response = await axios.get(objectUrl, getAuthConfig());
            if (statusArray.includes(response.status)) {
                return { status: true, message: response.data };
            } else {
                return { status: false, message: 'Erro ao processar a requisição.' };
            }
        } catch (error) {
            return { status: false, message: "Erro no servidor: " + error };
        }
    }

    async function postOrder(object) {
        const data = object.setData();
        delete data.id;

        try {
            const response = await axios.post(objectUrl, data, getAuthConfig());
            if (statusArray.includes(response.status)) {
                return { status: true, message: `${object.propertyName()} cadastrad${object.gender()} com sucesso.` };
            } else {
                return { status: false, message: 'Erro ao processar a requisição!' };
            }
        } catch (error) {
            return { status: false, message: "Erro no servidor: " + error };
        }
    }

    async function putOrder(object) {
        const data = object.setData();

        try {
            const response = await axios.put(objectUrl, data, getAuthConfig());
            if (statusArray.includes(response.status)) {
                return { status: true, message: `${object.propertyName()} alterad${object.gender()} com sucesso.` };
            } else {
                return { status: false, message: 'Erro ao processar a requisição!' };
            }
        } catch (error) {
            return { status: false, message: "Erro no servidor: " + error };
        }
    }

    async function deleteOrder(object) {
        const data = object.setData();

        try {
            const response = await axios.delete(objectUrl + data.id, getAuthConfig());
            if (statusArray.includes(response.status)) {
                return { status: true, message: `${object.propertyName()} excluíd${object.gender()} com sucesso.` };
            } else {
                return { status: false, message: 'Erro ao processar a requisição.' };
            }
        } catch (error) {
            return { status: false, message: "Erro no servidor: " + error };
        }
    }

    return { getOrder, postOrder, putOrder, deleteOrder };
}

export default ConnectionEntity;
import axios from "axios";
import { useApi } from '../api';

function ConnectionEntity() {

    const api = useApi();
    const statusArray = [200, 201];
    let requisitionUrl = '';

    function objectUrl(url) {
        // Limpa e adiciona uma nova url
        requisitionUrl = api.appendRoute(url);
        requisitionUrl += "/";
        return this;
    }

    function actionUrl(url) {
        // Divide a string por "/"
        const parts = requisitionUrl.split("/");

        // Mantém as partes até a posição 5 (0-indexed)
        const objectUrl = parts.slice(0, 5);

        // Adiciona o novo segmento à lista de partes
        objectUrl.push(url);

        // Remonta a string com "/"
        requisitionUrl = objectUrl.join("/");
        requisitionUrl += "/";
        return this;
    }

    async function getOrder() {

        try {
            const response = await axios.get(requisitionUrl, api.getAuthConfig());
            if (statusArray.includes(response.status)) {
                return { status: true, message: 'Informações adquiridas com sucesso.', data: response.data };
            } else {
                return { status: false, message: 'Erro ao processar a requisição!', data: response.data };
            }
        } catch (error) {
            if (error.response) {
                return { status: false, message: "Erro no servidor: " + error.response.data.message ? error.response.data.message : error.response.data, data: error.response.data };
            } else {
                return { status: false, message: "Erro na requisição: Sem resposta do servidor!", data: "" };
            }
        }
    }

    async function postOrder(object) {
        const data = object.setData();
        delete data.id;

        try {
            const response = await axios.post(requisitionUrl, data, api.getAuthConfig());
            if (statusArray.includes(response.status)) {
                return { status: true, message: `${object.propertyName()} cadastrad${object.gender()} com sucesso.`, data: response.data };
            } else {
                return { status: false, message: 'Erro ao processar a requisição!', data: response.data };
            }
        } catch (error) {
            if (error.response) {
                return { status: false, message: "Erro no servidor: " + error.response.data.message ? error.response.data.message : error.response.data, data: error.response.data };
            } else {
                return { status: false, message: "Erro na requisição: Sem resposta do servidor!", data: "" };
            }
        }
    }

    async function putOrder(object) {
        const data = object.setData();

        try {
            const response = await axios.put(requisitionUrl, data, api.getAuthConfig());
            if (statusArray.includes(response.status)) {
                return { status: true, message: `${object.propertyName()} alterad${object.gender()} com sucesso.`, data: response.data };
            } else {
                return { status: false, message: 'Erro ao processar a requisição!', data: response.data };
            }
        } catch (error) {
            if (error.response) {
                return { status: false, message: "Erro no servidor: " + error.response.data.message ? error.response.data.message : error.response.data, data: error.response.data };
            } else {
                return { status: false, message: "Erro na requisição: Sem resposta do servidor!", data: "" };
            }
        }
    }

    async function deleteOrder(object) {
        const data = object.setData();

        try {
            const response = await axios.delete(requisitionUrl + data.id, api.getAuthConfig());
            if (statusArray.includes(response.status)) {
                return { status: true, message: `${object.propertyName()} excluíd${object.gender()} com sucesso.`, data: response.data };
            } else {
                return { status: false, message: 'Erro ao processar a requisição!', data: response.data };
            }
        } catch (error) {
            if (error.response) {
                return { status: false, message: "Erro no servidor: " + error.response.data.message ? error.response.data.message : error.response.data, data: error.response.data };
            } else {
                return { status: false, message: "Erro na requisição: Sem resposta do servidor!", data: "" };
            }
        }
    }

    return { objectUrl, actionUrl, getOrder, postOrder, putOrder, deleteOrder };
}

export default ConnectionEntity;
import axios from "axios";
import ApiService from '../api';

function ConnectionService() {

    const api = ApiService();
    const resultRequest = {
        success: [200, 201],
        bad: [400],
        noresponse: [500],
        error: [401]
    };
    let messageRequest = { type: '', content: '' };
    let urlRequest = '';
    let response = { status: false, data: [] };

    function clearResponse() {
        response = { status: false, data: [] };
    }

    function updateResponse(result) {
        response = result;
    }

    function endpoint(url) {
        clearResponse();

        // Limpa e adiciona uma nova url
        urlRequest = api.appendRoute(url);
        urlRequest += "/";
        return this;
    }

    /*
    function endpoint(endpoint, action) {
        clearResponse();

        urlRequest = api.appendRoute(endpoint) + "/";
        if (action) urlRequest = urlRequest + action + "/";

        return this;
    }
    */

    function action(url) {
        // Divide a string por "/"
        const parts = urlRequest.split("/");

        // Mantém as partes até a posição 5 (0-indexed)
        const objectUrl = parts.slice(0, 5);

        // Adiciona o novo segmento à lista de partes
        objectUrl.push(url);

        // Remonta a string com "/"
        urlRequest = objectUrl.join("/");
        urlRequest += "/";
        return this;
    }

    async function executeRequest(requestFunction) {
        try {
            const result = await requestFunction();

            if (resultRequest['error'].includes(result.status)) {
                if (result.data.error) messageRequest = { type: 'bad', content: result.data.error };
                else messageRequest = { type: 'bad', content: 'Dados inválidos!' };
                return { status: false, data: result.data };

            } else if (resultRequest['bad'].includes(result.status)) {
                messageRequest = { type: 'bad', content: 'Dados inválidos!' };
                return { status: false, data: result.data };

            } else {
                return { status: true, data: result.data };
            }
        } catch (error) {
            if (resultRequest['noresponse'].includes(error.response.status)) {
                messageRequest = { type: 'error', content: 'Sem resposta do servidor!' };
                return { status: false, data: null };
            } else {
                messageRequest = { type: 'error', content: 'Erro ao executar a requisição!' };
                return { status: false, data: error.response.data };
            }
        }
    }

    async function getOrder() {
        const result = await executeRequest(() => getMethod());
        if (result.status) updateResponse({ status: false, data: [] });
        return this;
    }

    async function getMethod() {
        return await axios.get(urlRequest, api.getAuthConfig());
    }

    async function postOrder(object) {
        const result = await executeRequest(() => postMethod(object));
        if (result.status) messageRequest = { type: 'success', content: `${object.propertyName()} cadastrad${object.gender()} com sucesso.` };
        updateResponse(result); return this;
    }

    async function postMethod(object) {
        const data = object.setData(); delete data.id;
        return await axios.post(urlRequest, data, api.getAuthConfig());
    }

    async function putOrder(object) {
        const result = await executeRequest(() => putMethod(object));
        if (result.status) messageRequest = { type: 'success', content: `${object.propertyName()} alterad${object.gender()} com sucesso.` };
        updateResponse(result); return this;
    }

    async function putMethod(object) {
        const data = object.setData();
        return await axios.put(urlRequest, data, api.getAuthConfig());
    }

    async function deleteOrder(object) {
        const result = await executeRequest(() => deleteMethod(object));
        if (result.status) messageRequest = { type: 'success', content: `${object.propertyName()} excluíd${object.gender()} com sucesso.` };
        updateResponse(result); return this;
    }

    async function deleteMethod(object) {
        const data = object.setData();
        return await axios.delete(urlRequest + data.id, api.getAuthConfig());
    }

    function message() {
        console.log(messageRequest);
        return;
    }

    return {
        endpoint,
        action,
        getOrder,
        postOrder,
        putOrder,
        deleteOrder,
        message,
        response
    };
}

export default ConnectionService;
import axios from 'axios';
import ApiService from '../api';
import CookieModule from '../../modules/cookie';

export default class ConnectionService {
    constructor() {
        this.api = new ApiService();
        this.shootPopUp = false;
        this.getPopUp = false;
        this.responseModel = {
            status: 0,
            message: '',
            data: null
        };
        this.responseStatus = {
            Success: 1,
            Invalid: 2,
            NotFound: 3,
            Conflict: 4,
            Unauthorized: 5,
            Error: 6
        };

        this.resetData();
    }

    resetData() {
        this.url = '';
        this.typeMethod = '';
        this.response = { status: false, data: null };
        this.messageRequest = { type: '', content: '' };

        this.cookie = new CookieModule();
    }

    isSuccess(status) {
        return status === this.responseStatus.Success;
    }

    isInvalid(status) {
        return status === this.responseStatus.Invalid;
    }

    isNotFound(status) {
        return status === this.responseStatus.NotFound;
    }

    isConflict(status) {
        return status === this.responseStatus.Conflict;
    }

    isUnauthorized(status) {
        return status === this.responseStatus.Unauthorized;
    }

    isError(status) {
        return status === this.responseStatus.Error;
    }

    identifyStatus(status) {
        switch (status) {
            case this.responseStatus.Success:
                return 'success';
            case this.responseStatus.Invalid:
                return 'invalid';
            case this.responseStatus.NotFound:
                return 'not found';
            case this.responseStatus.Conflict:
                return 'conflict';
            case this.responseStatus.Unauthorized:
                return 'unauthorized';
            case this.responseStatus.Error:
                return 'error';
            default:
                return 'error';
        }
    }

    updateResponse(result) {
        this.response = result;
    }

    endpoint(url) {
        this.resetData();

        this.url = this.api.appendRoute(url);
        return this;
    }

    action(url) {
        this.url += `/${url}`;
        return this;
    }

    data(data) {
        this.url += `/${data}`;
        return this;
    }

    async execute(method, type) {
        try {
            this.typeMethod = type;
            const result = await method();

            // Verifica se o objeto retornado possui as mesmas propriedades e tipos do modelo
            if (result && JSON.stringify(Object.keys(result.data)) === JSON.stringify(Object.keys(this.responseModel))) {
                this.responseModel = result.data;

                this.messageRequest = { type: this.responseModel.status, content: this.responseModel.message };
                return this.isSuccess(this.responseModel.status) ? { status: true, data: this.responseModel.data } : { status: false, data: this.responseModel.data };
            } else {
                this.messageRequest = { type: 'error', content: "Ocorreu um erro durante a requisição!" };
                return { status: false, data: null };
            }
        } catch (error) {

            if ('status' in error.response.data) {
                this.messageRequest = { type: error.response.data.status, content: error.response.data.message };
            } else if (this.isNoServerResponse(error)) {
                this.messageRequest = { type: 'error', content: 'Sem resposta do servidor!' };
            } else {
                this.messageRequest = { type: 'error', content: 'Erro ao executar a requisição!' };
            }

            return { status: false, data: 'status' in error.response.data ? error.response.data.message : null };
        }
    }


    isSuccessResponse(result) {
        return result.status && [200, 201].includes(result.status);
    }

    isNoServerResponse(error) {
        return (
            (error.status && [500].includes(error.result.status)) || // Verifica se o status é 500
            error.code === 'ERR_NETWORK' // Verifica se o código de erro é ERR_NETWORK, que pode ser conexão recusada ou servidor inoperante
        );
    }

    async get() {
        this.updateResponse(await this.execute(() => this.getMethod(), 'GET')); this.messagePopUp();
    }

    async getMethod() {
        return await axios.get(this.url, this.api.headerConfig());
    }

    async post(parameter) {
        this.updateResponse(await this.execute(() => this.postMethod(parameter), 'POST')); this.messagePopUp();
    }

    async postMethod(parameter) {
        return parameter ?
            await axios.post(this.url, parameter, this.api.headerConfig()) :
            await axios.post(this.url, this.api.headerConfig());
    }

    async put(parameter) {
        this.updateResponse(await this.execute(() => this.putMethod(parameter), 'PUT')); this.messagePopUp();
    }

    async putMethod(parameter) {
        return parameter ?
            await axios.put(this.url, parameter, this.api.headerConfig()) :
            await axios.put(this.url, this.api.headerConfig());
    }

    async delete(parameter) {
        this.updateResponse(await this.execute(() => this.deleteMethod(parameter), 'DELETE')); this.messagePopUp();
    }

    async deleteMethod(parameter) {
        return parameter ?
            await axios.delete(`${this.url}/${parameter}`, this.api.headerConfig()) :
            await axios.delete(this.url, this.api.headerConfig());
    }

    messagePopUp() {
        if (!this.response.status || (this.typeMethod !== 'GET' || this.getPopUp)) {
            // Definir o tempo de exibição do popup (5 segundos)
            const POPUP_TIMEOUT = 5000;

            // Criar pop-up
            const popUp = document.createElement('div');

            // Definir o título e a cor do pop-up com base no type do messageRequest
            let popUpContent = '';
            let popUpClass = '';
            let title = '';

            switch (this.messageRequest.type) {
                case 'Success':
                    popUpContent = this.messageRequest.content;
                    popUpClass = 'bg-green-100 border-t-4 border-green-500';
                    title = 'Sucesso';
                    break;
                case 'Invalid':
                    popUpContent = this.messageRequest.content;
                    popUpClass = 'bg-red-100 border-t-4 border-red-500';
                    title = 'Erro';
                    break;
                case 'NotFound':
                    popUpContent = this.messageRequest.content;
                    popUpClass = 'bg-yellow-100 border-t-4 border-yellow-500';
                    title = 'Não Encontrado';
                    break;
                case 'Conflict':
                    popUpContent = this.messageRequest.content;
                    popUpClass = 'bg-orange-100 border-t-4 border-orange-500';
                    title = 'Conflito';
                    break;
                case 'Unauthorized':
                    popUpContent = this.messageRequest.content;
                    popUpClass = 'bg-blue-100 border-t-4 border-blue-500';
                    title = 'Não Autorizado';
                    break;
                case 'Error':
                    popUpContent = this.messageRequest.content;
                    popUpClass = 'bg-red-100 border-t-4 border-red-500';
                    title = 'Erro';
                    break;
                default:
                    popUpContent = this.messageRequest.content;
                    popUpClass = 'bg-red-100 border-t-4 border-red-500';
                    title = 'Mensagem';
                    break;
            }

            popUp.innerHTML = `
    <div id="popup" class="fixed bottom-0 right-0 mb-4 mr-4 ${popUpClass} rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div class="flex items-center">
            <div class="mr-4">
                <svg class="fill-current h-6 w-6 ${popUpClass}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
                </svg>
            </div>
            <div>
                <p class="font-bold">${title}</p>
                <p class="text-sm">${popUpContent}</p>
            </div>
        </div>
        <button id="closeButton" class="focus:outline-none">
            <svg class="fill-current h-4 w-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M14.35 14.35a1 1 0 1 1-1.41 1.41l-7.07-7.07a1 1 0 0 1 0-1.41l7.07-7.07a1 1 0 1 1 1.41 1.41l-7.07 7.07a1 1 0 0 0 0 1.41l7.07 7.07z"/>
            </svg>
        </button>
    </div>
`;

            document.body.appendChild(popUp);

            // Adicionar evento de clique ao botão de fechar
            const closeButton = document.getElementById('closeButton');
            closeButton.addEventListener('click', () => {
                clearTimeout(timer); // Parar o timer quando o botão de fechar é clicado
                popUp.remove(); // Remove o pop-up quando o botão de fechar é clicado
            });

            // Remover pop-up após o tempo definido
            const timer = setTimeout(() => {
                popUp.remove();
            }, POPUP_TIMEOUT);
        }
    }

    enablePopUp() {
        this.shootPopUp = true;
        return this;
    }

    disablePopUp() {
        this.shootPopUp = false;
        return this;
    }

    enableGetPopUp() {
        this.getPopUp = true;
        return this;
    }

    disableGetPopUp() {
        this.getPopUp = false;
        return this;
    }

    getList() {
        return this.response.data ?
            this.response.data
            : [];
    }

    getObject() {
        return this.response.data ?
            this.response.data
            : null;
    }
}
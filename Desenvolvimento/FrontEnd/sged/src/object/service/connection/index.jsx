import axios from 'axios';
import ApiService from '../api';
import CookieModule from '../../modules/cookie';

export default class ConnectionService {
    constructor() {
        this.api = new ApiService();
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

                this.messageRequest = { type: this.identifyStatus(this.responseModel.status), content: this.responseModel.message };
                return this.isSuccess(this.responseModel.status) ? { status: true, data: this.responseModel.data } : { status: false, data: this.responseModel.data };
            } else {
                this.messageRequest = { type: 'error', content: "Ocorreu um erro durante a requisição!" };
                return { status: false, data: null };
            }
        } catch (error) {

            if ('status' in error.response.data) {
                this.messageRequest = { type: this.identifyStatus(this.responseModel.status), content: error.response.data.message };
            } else if (this.isNoServerResponse(error)) {
                this.messageRequest = { type: 'error', content: 'Sem resposta do servidor!' };
            } else {
                this.messageRequest = { type: 'error', content: 'Erro ao executar a requisição!' };
            }

            return { status: false, data: 'status' in error.response.data ? error.response.data.data : null };
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
        this.updateResponse(await this.execute(() => this.getMethod(), 'get'));
    }

    async getMethod() {
        return await axios.get(this.url, this.api.headerConfig());
    }

    async post(parameter) {
        this.updateResponse(await this.execute(() => this.postMethod(parameter), 'post'));
    }

    async postMethod(parameter) {
        return parameter ?
            await axios.post(this.url, parameter, this.api.headerConfig()) :
            await axios.post(this.url, this.api.headerConfig());
    }

    async put(parameter) {
        this.updateResponse(await this.execute(() => this.putMethod(parameter), 'put'));
    }

    async putMethod(parameter) {
        return parameter ?
            await axios.put(this.url, parameter, this.api.headerConfig()) :
            await axios.put(this.url, this.api.headerConfig());
    }

    async delete(parameter) {
        this.updateResponse(await this.execute(() => this.deleteMethod(parameter), 'delete'));
    }

    async deleteMethod(parameter) {
        return parameter ?
            await axios.delete(`${this.url}/${parameter}`, this.api.headerConfig()) :
            await axios.delete(this.url, this.api.headerConfig());
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
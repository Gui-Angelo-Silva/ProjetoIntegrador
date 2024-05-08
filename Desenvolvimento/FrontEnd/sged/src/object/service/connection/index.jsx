import axios from 'axios';
import ApiService from '../api';

export default class ConnectionService {
    constructor() {
        this.api = new ApiService();
        this.shootPopUp = false;
        this.getPopUp = false;

        this.resetData();
    }

    resetData() {
        this.url = '';
        this.typeMethod = '';
        this.response = { status: false, data: null };
        this.messageRequest = { type: '', content: '' };
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
        this.url += `/${actionUrl}`;
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

            if (this.isSuccessResponse(result)) {
                this.messageRequest = { type: 'sucess', content: result.data.data? result.data.data : 'Requisição realizada com sucesso!' };
                return { status: true, data: result.data };

            } else {
                this.messageRequest = { type: 'bad', content: result.data.data? result.data.data : 'Requisição negada!' };
                return { status: false, data: result.data };
            }
            
        } catch (error) {
            if (this.isNoServerResponse(error)) {
                this.messageRequest = { type: 'error', content: 'Sem resposta do servidor!' };

            } else {
                this.messageRequest = { type: 'error', content: 'Erro ao executar a requisição!' };
            }

            return { status: false, data: null };
        }
    }

    isSuccessResponse(result) {
        return result.status && [200, 201].includes(result.status);
    }
    
    isNoServerResponse(error) {
        return (
            (error.status && [500].includes(error.result.status)) || // Verifica se o status é 500
            error.code === "ERR_NETWORK" // Verifica se o código de erro é ERR_NETWORK, que pode ser conexão recusada ou servidor inoperante
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
            await axios.delete(`${this.url}${parameter}`, this.api.headerConfig()) :
            await axios.delete(this.url, this.api.headerConfig());
    }

    messagePopUp() {
        if (this.shootPopUp && (this.typeMethod !== 'GET' || this.getPopUp)) {
            console.log(this.messageRequest);
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
        return this.response.status?
            this.response.status.data.data?
                this.response.status.data.data
                : this.response.status.data
            : [];
    }

    getObject() {
        return this.response.status?
            this.response.status.data.data?
                this.response.status.data.data
                : this.response.status.data
            : null;
    }
}
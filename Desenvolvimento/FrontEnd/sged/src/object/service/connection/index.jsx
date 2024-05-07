import axios from 'axios';
import ApiService from '../api';

class ConnectionService {
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
        resetData();

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
                this.messageRequest = { type: 'sucess', content: result.data };
                return { status: true, data: result.data };
            } else {
                this.messageRequest = { type: 'bad', content: result.data };
                return { status: false, data: result.data };
            }
            
        } catch (error) {
            if (this.isNoResponseError(error)) {
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
    
    isNoResponseError(error) {
        return error.response.status && [500].includes(error.response.status);
    }

    async get() {
        const result = await this.execute(() => this.getMethod(), 'GET'); 
        this.updateResponse(result); this.messagePopUp();
    }

    async getMethod() {
        return await axios.get(this.url, this.api.headerConfig());
    }

    async post(parameter) {
        const result = await this.execute(() => this.postMethod(parameter), 'POST');
        this.updateResponse(result); this.messagePopUp();
    }

    async postMethod(parameter) {
        return parameter ? 
            await axios.post(this.url, parameter, this.api.headerConfig()) :
            await axios.post(this.url, this.api.headerConfig());
    }

    async put(parameter) {
        const result = await this.execute(() => this.putMethod(parameter), 'PUT'); 
        this.updateResponse(result); this.messagePopUp();
    }

    async putMethod(parameter) {
        return parameter ? 
            await axios.put(this.url, parameter, this.api.headerConfig()) :
            await axios.put(this.url, this.api.headerConfig());
    }

    async delete(parameter) {
        const result = await this.execute(() => this.deleteMethod(parameter), 'DELETE'); 
        this.updateResponse(result); this.messagePopUp();
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
}
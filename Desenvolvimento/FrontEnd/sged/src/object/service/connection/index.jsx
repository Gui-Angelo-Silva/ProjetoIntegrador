import { useEffect } from 'react';
import axios from 'axios';
import ApiService from '../api';

class ConnectionService {

    constructor() {
        this.api = new ApiService();
        this.url = '';
        this.typeMethod = '';
        this.statusPopUp = false;
        this.getPopUp = false;
        this.response = { status: false, data: [] };
        this.messageRequest = { type: '', content: '' };
        this.statusRequest = {
            success: [200, 201],
            bad: [400, 404],
            noresponse: [500],
            error: [401]
        };
    }

    clearData() {
        this.url = '';
        this.typeMethod = '';
        this.response = { status: false, data: [] };
        this.messageRequest = { type: '', content: '' };
    }

    updateResponse(result) {
        this.response = result;
    }

    endpoint(endpointUrl) {
        this.clearData(); this.url = this.api.appendRoute(endpointUrl);
        return this;
    }

    action(actionUrl) {
        /*const parts = this.url.split("/");
        const objectUrl = parts.slice(0, 5);

        objectUrl.push(actionUrl);
        this.url = objectUrl.join("/") + "/";*/

        objectUrl = objectUrl + `/${actionUrl}`;
        return this;
        
    }

    data(dataUrl) {
        objectUrl = objectUrl + `/${dataUrl}`;
        return this;
    }

    async execute(method, type) {
        try {
            this.typeMethod = type;
            const result = await method();

            //console.log(result.headers);

            if (this.statusRequest.success.includes(result.status)) {
                return { status: true, data: result.data };
            } else {
                if (result.data.error) this.messageRequest = { type: 'bad', content: result.data.error };
                else this.messageRequest = { type: 'bad', content: 'Dados inválidos!' };
            }

            return { status: false, data: result.data };
        } catch (error) {
            if (this.statusRequest.noresponse.includes(error.response.status)) {
                this.messageRequest = { type: 'error', content: 'Sem resposta do servidor!' };
                return { status: false, data: null };
            }

            this.messageRequest = { type: 'error', content: 'Erro ao executar a requisição!' };
            return { status: false, data: error.response.data };
        }
    }

    async get() {
        const result = await this.execute(() => this.getMethod(), 'GET');
        if (!result.status) this.clearData();
        else this.messageRequest = { type: 'success', content: `Dados obtidos com sucesso.` };
        this.updateResponse(result); if (this.statusPopUp) this.messagePopUp();
    }

    async getMethod() {
        return await axios.get(this.url, this.api.headerConfig());
    }

    async post(parameter) {
        const result = await this.execute(() => this.postMethod(parameter), 'POST');
        if (result.status) this.messageRequest = { type: 'success', content: `${parameter.propertyName()} cadastrad${parameter.gender()} com sucesso.` };
        this.updateResponse(result); if (this.statusPopUp) this.messagePopUp(); 
    }

    async postMethod(parameter) {
        //const data = parameter.setData(); delete data.id;
        return await axios.post(this.url, parameter, this.api.headerConfig());
    }

    async put(parameter) {
        const result = await this.execute(() => this.putMethod(parameter), 'PUT');
        if (result.status) this.messageRequest = { type: 'success', content: `${parameter.propertyName()} alterad${parameter.gender()} com sucesso.` };
        this.updateResponse(result); if (this.statusPopUp) this.messagePopUp();
    }

    async putMethod(parameter) {
        //const data = parameter.setData();
        return await axios.put(this.url, parameter, this.api.headerConfig());
    }

    async delete(parameter) {
        const result = await this.execute(() => this.deleteMethod(parameter), 'DELETE');
        if (result.status) this.messageRequest = { type: 'success', content: `${parameter.propertyName()} excluíd${parameter.gender()} com sucesso.` };
        this.updateResponse(result); if (this.statusPopUp) this.messagePopUp();
    }

    async deleteMethod(parameter) {
        //const data = parameter.setData();
        return await axios.delete(`${this.url}${parameter}`, this.api.headerConfig());
    }

    messagePopUp() {
        if (this.messageRequest.type) {
            if (this.typeMethod !== 'GET' || this.getPopUp) {
                console.log(this.messageRequest);
            }
        }
    }

    enablePopUp() {
        this.statusPopUp = true;
        return this;
    }

    disablePopUp() {
        this.statusPopUp = false;
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

export default ConnectionService;
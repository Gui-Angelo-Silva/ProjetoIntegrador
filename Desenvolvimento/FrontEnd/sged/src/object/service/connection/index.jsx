import axios from "axios";
import ApiService from '../api';

function ConnectionService() {

    this.url = '';
    this.api = new ApiService();
    this.response = {status: false, data: []};
    this.messageRequest = { type: '', content: '' };
    this.statusRequest = {
        success: [200, 201],
        bad: [400],
        noresponse: [500],
        error: [401]
    };

    this.clearResponse = function() {
        this.response = { status: false, data: [] };
    }

    this.updateResponse = function(result) {
        this.response = result;
    }

    this.endpoint = function(url) {
        this.url = this.api.appendRoute(url) + "/";
        return this;
    };

    this.action = function(url) {
        const parts = this.url.split("/");
        const objectUrl = parts.slice(0, 5);
        objectUrl.push(url);
        this.url = objectUrl.join("/") + "/";
        return this;
    };

    this.execute = async function(method) {
        try {
            const result = await method();

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
    };

    this.get = async function() {
        const result = await this.execute(() => this.getMethod());
        if (!result.status) this.clearResponse();
        return this;
    };

    this.getMethod = async function() {
        return await axios.get(this.url, this.api.getAuthConfig());
    }

    this.post = async function(object) {
        const result = await this.execute(() => this.postMethod(object));
        if (result.status) this.messageRequest = { type: 'success', content: `${object.propertyName()} cadastrad${object.gender()} com sucesso.` };
        this.updateResponse(result); return this;
    };

    this.postMethod = async function(object) {
        const data = object.setData(); delete data.id;
        return await axios.post(this.url, data, this.api.getAuthConfig());
    }

    this.put = async function(object) {
        const result = await this.execute(() => this.putMethod(object));
        if (result.status) this.messageRequest = { type: 'success', content: `${object.propertyName()} alterad${object.gender()} com sucesso.` };
        this.updateResponse(result); return this;
    };

    this.putMethod = async function(object) {
        const data = object.setData();
        return await axios.put(this.url, data, this.api.getAuthConfig());
    }

    this.delete = async function(object) {
        const result = await this.execute(() => this.deleteMethod(object));
        if (result.status) this.messageRequest = { type: 'success', content: `${object.propertyName()} excluíd${object.gender()} com sucesso.` };
        this.updateResponse(result); return this;
    };

    this.deleteMethod = async function(object) {
        const data = object.setData();
        return await axios.put(this.url, data.id, this.api.getAuthConfig());
    }

    this.messagePopUp = function() {
        console.log(this.messageRequest); return this;
    }
}

export default ConnectionService;
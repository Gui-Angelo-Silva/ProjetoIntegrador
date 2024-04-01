import axios from "axios";
import ApiService from '../api';

function ConnectionService() {

    this.api = new ApiService();
    this.url = '';
    this.typeMethod = '';
    this.activityGetPopUp = true;
    this.response = { status: false, data: [] };
    this.messageRequest = { type: '', content: '' };
    this.statusRequest = {
        success: [200, 201],
        bad: [400, 404],
        noresponse: [500],
        error: [401]
    };

    this.clearData = function () {
        this.typeMethod = '';
        this.response = { status: false, data: [] };
        this.messageRequest = { type: '', content: '' };
    }

    this.updateResponse = function (result) {
        this.response = result;
    }

    this.updateActivityGet = function (bool) {
        this.activityGetPopUp = bool;
    }

    this.endpoint = function (url) {
        this.clearData();
        this.url = this.api.appendRoute(url) + "/";
        return this;
    };

    this.action = function (url) {
        const parts = this.url.split("/");
        const objectUrl = parts.slice(0, 5);
        objectUrl.push(url);
        this.url = objectUrl.join("/") + "/";
        return this;
    };

    this.execute = async function (method, type) {
        try {
            this.typeMethod = type;
            const result = await method();

            if (this.statusRequest.success.includes(result.status)) {
                console.log('Header:', this.api.headerConfig());
                console.log('Response:', result);

                //this.api.updateToken(result.headers.token);
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

    this.get = async function (data) {
        const result = await this.execute(() => this.getMethod(data), 'GET');
        if (!result.status) this.clearResponse();
        this.updateResponse(result);
    };

    this.getMethod = async function (data) {
        return await axios.get(data ? `${this.url}${data}` : this.url, this.api.headerConfig());
    }

    this.post = async function (object) {
        const result = await this.execute(() => this.postMethod(object), 'POST');
        if (result.status) this.messageRequest = { type: 'success', content: `${object.propertyName()} cadastrad${object.gender()} com sucesso.` };
        this.updateResponse(result);
    };

    this.postMethod = async function (object) {
        const data = object.setData(); delete data.id;
        return await axios.post(this.url, data, this.api.headerConfig());
    }

    this.put = async function (object) {
        const result = await this.execute(() => this.putMethod(object), 'PUT');
        if (result.status) this.messageRequest = { type: 'success', content: `${object.propertyName()} alterad${object.gender()} com sucesso.` };
        this.updateResponse(result);
    };

    this.putMethod = async function (object) {
        const data = object.setData();
        return await axios.put(this.url, data, this.api.headerConfig());
    }

    this.delete = async function (object) {
        const result = await this.execute(() => this.deleteMethod(object), 'DELETE');
        if (result.status) this.messageRequest = { type: 'success', content: `${object.propertyName()} excluíd${object.gender()} com sucesso.` };
        this.updateResponse(result);
    };

    this.deleteMethod = async function (object) {
        const data = object.setData();
        return await axios.delete(this.url, data.id, this.api.headerConfig());
    }

    this.messagePopUp = function () {
        useEffect(() => {
            if (this.messageRequest.type) {
                if (this.typeMethod !== 'GET' || this.activityGetPopUp) {
                    console.log(this.messageRequest);
                }
            }
        }, [this.messageRequest]);
    }
}

export default ConnectionService;
import axios from "axios";
import { useSession } from '../../../services/session';
import { useApi } from '../../../services/api';

class ConnectionClass {

    constructor(getAuthConfig, objectUrl) {
        this.getAuthConfig = getAuthConfig;
        this.objectUrl = objectUrl;
    }

    async getOrder() {
        try {
            const response = await axios.get(this.objectUrl, this.getAuthConfig());
            if (response.status === 200) {
                return { status: true, message: response.data };

            } else {
                return { status: false, message: 'Erro ao processar a requisição.' };
            }

        } catch (error) {
            return { status: false, message: error };
        }
    }

    async postOrder(object) {
        var response = await object.verifyData();
        if (response) {
            const data = object.setData();
            delete data.id;

            try {
                response = await axios.post(this.objectUrl, data, this.getAuthConfig());
                if (response.status === 200) {
                    object.getData(response);
                    return { status: true, message: 'Registro ' + object.propertyName() + ' cadastrado com sucesso.' };

                } else {
                    return { status: false, message: 'Erro ao processar a requisição.' };
                }

            } catch (error) {
                return { status: false, message: error };
            }

        } else {
            return false;

        }
    }


    async putOrder(object) {

        var response = await object.verifyData();
        if (response) {
            const data = object.setData();
            delete data.id;

            try {
                response = await axios.put(this.objectUrl, data, this.getAuthConfig());
                if (response.status === 200) {
                    object.getData(response);
                    return { status: true, message: 'Registro ' + object.propertyName() + ' alterado com sucesso.' };

                } else {
                    return { status: false, message: 'Erro ao processar a requisição!' };
                }

            } catch (error) {
                return { status: false, message: error };
            }

        } else {
            return { status: false, message: '' };

        }
    }

    async deleteOrder(object) {
        const data = object.setData();
        try {
            const response = await axios.delete(this.objectUrl + data.id, this.getAuthConfig());
            if (response.status === 200) {
                return { status: true, message: 'Registro ' + object.propertyName() + ' excluído com sucesso.' };

            } else {
                return { status: false, message: 'Erro ao processar a requisição.' };
            }

        } catch (error) {
            return { status: false, message: error };
        }
    }
}

const useConnectionClass = (url) => {
    const { getAuthConfig } = useSession();
    const { appendRoute } = useApi();
    const objectUrl = appendRoute(url);

    return new ConnectionClass(getAuthConfig, objectUrl);
};

export default useConnectionClass;

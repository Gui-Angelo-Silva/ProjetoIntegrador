function CookieModule() {

    // Função para recuperar um cookie pelo nome
    function getCookie(name) {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookies = decodedCookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                const cookieValue = cookie.substring(name.length + 1, cookie.length);
                try {
                    // Tentar converter o valor do cookie de volta para um objeto
                    return JSON.parse(cookieValue);
                } catch (error) {
                    // Se não for um objeto JSON, retornar o valor como está
                    return cookieValue;
                }
            }
        }
        return null;
    }

    // Função para definir um cookie
    function setCookie(name, value, hour) {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + (hour * 60 * 60 * 1000));
        const expires = "expires=" + expirationDate.toUTCString();

        // Verificar se o valor é um objeto
        const cookieValue = typeof value === 'object' ? JSON.stringify(value) : value;

        document.cookie = name + "=" + cookieValue + ";" + expires + ";path=/";
    }

    // Função para excluir um cookie
    function deleteCookie(name) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    }

    return {
        // Funções
        getCookie,
        setCookie,
        deleteCookie
    };

}

export default CookieModule;
import { useState, useEffect } from 'react';
import ControlModule from '../../../object/modules/control';
import defaultProfilePicture from '../../../assets/user/defaultProfilePicture.png';
import closeIcon from '../../../assets/user/closeIcon.png';

function PersonClass() {
    const control = ControlModule();

    const [personPicture, setPersonPicture] = useState("data:application/octet-stream;base64,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");
    const [personName, setPersonName] = useState("");
    const [personEmail, setPersonEmail] = useState("");
    const [personTelephone, setPersonTelephone] = useState("");
    const [personCpfCnpj, setPersonCpfCnpj] = useState("");
    const [personRgIe, setPersonRgIe] = useState("");

    const [errorPersonPicture, setErrorPersonPicture] = useState("");
    const [errorPersonName, setErrorPersonName] = useState("");
    const [errorPersonEmail, setErrorPersonEmail] = useState("");
    const [errorPersonTelephone, setErrorPersonTelephone] = useState("");
    const [errorPersonCpfCnpj, setErrorPersonCpfCnpj] = useState("");
    const [errorPersonRgIe, setErrorPersonRgIe] = useState("");

    function getData() {
        return {
            imagemPessoa: personPicture,
            nomePessoa: personName,
            emailPessoa: personEmail,
            telefonePessoa: personTelephone,
            cpfCnpjPessoa: personCpfCnpj,
            rgIePessoa: personRgIe
        };
    }

    function setData(object) {
        if (object.imagemPessoa) {
            if (object.imagemPessoa !== personPicture) setAddImage(true);
            setPersonPicture(object.imagemPessoa);
        } else removePicture();

        setPersonName(object.nomePessoa);
        setPersonEmail(object.emailPessoa);
        setPersonTelephone(object.telefonePessoa);
        setPersonCpfCnpj(object.cpfCnpjPessoa);
        setPersonRgIe(object.rgIePessoa);

        setIdentifyCpfCnpj(object.cpfCnpjPessoa?.length === 14 ? "cpf" : "cnpj");
        setIdentifyRgIe(object.rgIePessoa?.length === 12 ? "rg" : "ie");
    }

    function setError(json) {
        setErrorPersonEmail(json.email);
        setErrorPersonCpfCnpj(json.cpfcnpj);
        setErrorPersonRgIe(json.rgie);
    }

    function clearData() {
        setPersonName('');
        setPersonEmail('');
        setPersonTelephone('');
        setPersonCpfCnpj('');
        setPersonRgIe('');

        setIdentifyCpfCnpj("cpf");
        setIdentifyRgIe("rg");
        removePicture();
    };

    function clearError() {
        setErrorPersonPicture('');
        setErrorPersonName('');
        setErrorPersonEmail('');
        setErrorPersonTelephone('');
        setErrorPersonCpfCnpj('');
        setErrorPersonRgIe('');
    };

    function validateCpf(cpf) {
        const multiplicador1 = [10, 9, 8, 7, 6, 5, 4, 3, 2];
        const multiplicador2 = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        let tempCpf = cpf.substring(0, 9);
        let soma = 0;

        for (let i = 0; i < 9; i++) {
            soma += parseInt(tempCpf[i]) * multiplicador1[i];
        }
        let resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        let digito = resto.toString();
        tempCpf += digito;
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(tempCpf[i]) * multiplicador2[i];
        }
        resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        digito += resto.toString();
        return cpf.endsWith(digito);
    }

    function validateCnpj(cnpj) {
        const multiplicador1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const multiplicador2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        let soma = 0;
        let resto;
        let digito;
        let tempCnpj = cnpj.substring(0, 12);

        for (let i = 0; i < 12; i++) {
            soma += parseInt(tempCnpj[i]) * multiplicador1[i];
        }
        resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        digito = resto.toString();
        tempCnpj += digito;
        soma = 0;
        for (let i = 0; i < 13; i++) {
            soma += parseInt(tempCnpj[i]) * multiplicador2[i];
        }
        resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        digito += resto.toString();
        return cnpj.endsWith(digito);
    }

    function CpfCnpj(cpfCnpj) {
        cpfCnpj = cpfCnpj.trim();

        if (cpfCnpj.length === 14 && identifyCpfCnpj === "cpf") {
            if (
                cpfCnpj[3] === '.' &&
                cpfCnpj[7] === '.' &&
                cpfCnpj[11] === '-'
            ) {
                cpfCnpj = control.removeNonNumericCharacter(cpfCnpj);

                if (!control.checkEqualsCaracters(cpfCnpj)) {
                    if (validateCpf(cpfCnpj)) return 1;
                    else return -1;
                } else { return -1; }
            } else { return -1; }
        } else if (cpfCnpj.length === 18 && identifyCpfCnpj === "cnpj") {
            if (
                cpfCnpj[2] === '.' &&
                cpfCnpj[6] === '.' &&
                cpfCnpj[10] === '/' &&
                cpfCnpj[15] === '-'
            ) {
                cpfCnpj = control.removeNonNumericCharacter(cpfCnpj);

                if (!control.checkEqualsCaracters(cpfCnpj)) {
                    if (validateCnpj(cpfCnpj)) return 2;
                    else return -2;
                } else { return -2; }
            } else { return -1; }
        }

        return 0;
    }

    function validateRg(rg) {
        const multiplicador1 = [2, 3, 4, 5, 6, 7, 8, 9];
        let soma = 0;
        let resto;
        for (let i = 0; i < 8; i++) {
            soma += parseInt(rg[i]) * multiplicador1[i];
        }
        resto = soma % 11;
        resto = resto < 2 ? 0 : 11 - resto;
        return rg.endsWith(resto.toString());
    }

    function validateIe(ie) {
        let strBase = ie;
        let intSoma = 0;
        let intPeso = 1;

        for (let intPos = 0; intPos < 8; intPos++) {
            let intValor = parseInt(strBase[intPos]);
            intValor *= intPeso;
            intSoma += intValor;

            intPeso++;
            if (intPeso === 2) {
                intPeso = 3;
            }
            if (intPeso === 9) {
                intPeso = 10;
            }
        }

        let intResto = intSoma % 11;
        let strDigito1 = intResto.toString().slice(-1);
        let strBase2 = strBase.slice(0, 8) + strDigito1 + strBase.slice(10, 12);

        intSoma = 0;
        intPeso = 2;

        for (let intPos = 11; intPos > 0; intPos--) {
            let intValor = parseInt(strBase[intPos]);
            intValor *= intPeso;
            intSoma += intValor;

            intPeso++;
            if (intPeso > 10) {
                intPeso = 2;
            }
        }

        intResto = intSoma % 11;
        let strDigito2 = intResto.toString().slice(-1);
        strBase2 += strDigito2;

        return strBase2 === ie;
    }

    function RgIe(rgIe) {
        rgIe = rgIe.trim();

        if (rgIe.length === 12 && identifyRgIe === "rg") {
            if (
                rgIe[2] === '.' &&
                rgIe[6] === '.' &&
                rgIe[10] === '-'
            ) {
                rgIe = control.removeNonNumericCharacter(rgIe);

                if (!control.checkEqualsCaracters(rgIe)) {
                    if (validateRg(rgIe)) return 1;
                    else return -1;
                } else { return -1; }
            }
        } else if (rgIe.length === 15 && identifyRgIe === "ie") {
            if (
                rgIe[3] === '.' &&
                rgIe[7] === '.' &&
                rgIe[11] === '.'
            ) {
                rgIe = control.removeNonNumericCharacter(rgIe);

                if (!control.checkEqualsCaracters(rgIe)) {
                    if (validateIe(rgIe)) return 2;
                    else return -2;
                } else { return -2; }
            }
        }

        return 0;
    }

    function verifyData() {
        clearError();
        let status = true;

        let picture = '';
        let name = '';
        let email = '';
        let telephone = '';
        let cpfCnpj = '';
        let rgIe = '';

        if (personName) {
            if (personName.length < 5) {
                name = 'O nome precisa ter no mínimo 5 letras!';
                status = false;
            }
        } else {
            name = 'O nome é requerido!';
            status = false;
        }

        if (personEmail) {
            if (personEmail.includes(' ')) {
                email = 'O e-mail não pode conter espaço em branco!';
                status = false;
            }

            const hasAtSymbol = personEmail.includes('@');
            const hasDot = personEmail.includes('.');
            const lastDotPosition = personEmail.lastIndexOf('.');

            const quantSymbol = personEmail.split('@').length - 1;
            const indexSymbol = personEmail.indexOf('@');
            const indexLastCaracter = personEmail.length - 1;
            const [emailAddress, domain] = personEmail.split('@');

            if (!email && !hasAtSymbol) {
                email = 'E-mail inválido: O e-mail deve conter um "@"!';
                status = false;
            } else if (!email && !hasDot) {
                email = 'E-mail inválido: O e-mail deve conter um "."!';
                status = false;
            } else if (!email && quantSymbol > 1) {
                email = 'E-mail inválido: O e-mail não pode conter mais de um "@"!';
                status = false;
            } else {
                if (!email && !emailAddress) {
                    email = 'E-mail inválido: O nome do usuário de e-mail não pode ser vazio!';
                    status = false;
                } else if (!email && lastDotPosition <= personEmail.indexOf('@')) {
                    email = 'E-mail inválido: O "." deve estar após o "@"!';
                    status = false;
                } else if (!email && (personEmail[indexSymbol + 1] === '.' || personEmail[indexLastCaracter] === '.' || control.removeNonNumericCharacter(domain))) {
                    email = 'E-mail inválido: Domínio ilegítimo!';
                    status = false;
                }
            }

        } else {
            email = 'O e-mail é requerido!';
            status = false;
        }

        if (personTelephone) {
            if (personTelephone.length !== 15) {
                telephone = 'Informe o ddd e o número completo!';
                status = false;
            }
        } else {
            telephone = 'O telefone é requerido!';
            status = false;
        }

        if (personCpfCnpj) {

            const response = CpfCnpj(personCpfCnpj);

            if (response === 0) { cpfCnpj = 'Documento incompleto!'; status = false; }
            else if (response === -1) { cpfCnpj = 'CPF inválido!'; status = false; }
            else if (response === -2) { cpfCnpj = 'CNPJ inválido!'; status = false; }

        } else {
            cpfCnpj = 'O CPF ou CNPJ é requerido!';
            status = false;
        }

        if (personRgIe) {

            const response = RgIe(personRgIe);

            if (response === 0) { rgIe = 'Documento incompleto!'; status = false; }
            else if (response === -1) { rgIe = 'RG inválido!'; status = false; }
            else if (response === -2) { rgIe = 'IE inválido!'; status = false; }

        } else {
            rgIe = 'O RG ou IE é requerido!';
            status = false;
        }

        if (!personPicture) {
            picture = 'A imagem é requerida!';
            status = false;
        }

        setErrorPersonPicture(picture);
        setErrorPersonName(name);
        setErrorPersonEmail(email);
        setErrorPersonTelephone(telephone);
        setErrorPersonCpfCnpj(cpfCnpj);
        setErrorPersonRgIe(rgIe);

        return status;
    }

    const handlePhone = (value) => {
        const numericValue = control.removeNonNumericCharacter(value);
        const formattedValue = formatPhone(numericValue);
        setPersonTelephone(formattedValue);
    };

    const formatPhone = (value) => {
        let formattedValue = '';

        if (value.length > 0) {
            // Adiciona o primeiro parêntese
            formattedValue += `(${value.slice(0, 2)}`;

            if (value.length > 2) {
                // Adiciona o segundo parêntese e o espaço
                formattedValue += `) ${value.slice(2, 7)}`;

                if (value.length > 7) {
                    // Adiciona o hífen e os últimos dígitos
                    formattedValue += `-${value.slice(7, 11)}`;
                }
            }
        }

        return formattedValue;
    };

    const [identifyCpfCnpj, setIdentifyCpfCnpj] = useState("cpf");
    const [identifyRgIe, setIdentifyRgIe] = useState("rg");

    const handleCpfCnpj = (value) => {
        const numericValue = control.removeNonNumericCharacter(value);
        const formattedValue = identifyCpfCnpj.length === 3 ? formatCPF(numericValue) : formatCNPJ(numericValue);
        setPersonCpfCnpj(formattedValue);
    };

    const formatCPF = (value) => {
        let formattedValue = '';

        if (value.length > 0) {
            // Adiciona o primeiro grupo de identificação
            formattedValue += `${value.slice(0, 3)}`;

            if (value.length > 3) {
                // Adiciona o segundo grupo de identificação
                formattedValue += `.${value.slice(3, 6)}`;

                if (value.length > 6) {
                    // Adiciona o terceiro grupo de identificação
                    formattedValue += `.${value.slice(6, 9)}`;

                    if (value.length > 9) {
                        // Adiciona os dígitos verificadores
                        formattedValue += `-${value.slice(9, 11)}`;
                    }
                }
            }
        }

        return formattedValue;
    };

    const formatCNPJ = (value) => {
        let formattedValue = '';

        if (value.length > 0) {
            // Adiciona o número da filial
            formattedValue += `${value.slice(0, 2)}`;

            if (value.length > 2) {
                // Adiciona o primeiro grupo da matriz
                formattedValue += `.${value.slice(2, 5)}`;

                if (value.length > 5) {
                    // Adiciona o segundo grupo da matriz
                    formattedValue += `.${value.slice(5, 8)}`;

                    if (value.length > 8) {
                        // Adiciona o código de controle
                        formattedValue += `/${value.slice(8, 12)}`;

                        if (value.length > 12) {
                            // Adiciona o número da filial
                            formattedValue += `-${value.slice(12, 14)}`;
                        }
                    }
                }
            }
        }

        return formattedValue;
    };

    const handleRgIe = (value) => {
        const numericValue = control.removeNonNumericCharacter(value);
        const formattedValue = identifyRgIe[0] === 'r' ? formatRG(numericValue) : formatIE(numericValue);
        setPersonRgIe(formattedValue);
    };

    const formatRG = (value) => {
        let formattedValue = '';

        if (value.length > 0) {
            // Adiciona o primeiro grupo de identificação
            formattedValue += `${value.slice(0, 2)}`;

            if (value.length > 2) {
                // Adiciona o segundo grupo de identificação
                formattedValue += `.${value.slice(2, 5)}`;

                if (value.length > 5) {
                    // Adiciona o terceiro grupo de identificação
                    formattedValue += `.${value.slice(5, 8)}`;

                    if (value.length > 8) {
                        // Adiciona os dígitos verificadores
                        formattedValue += `-${value.slice(8, 9)}`;
                    }
                }
            }
        }

        return formattedValue;
    };

    const formatIE = (value) => {
        let formattedValue = '';

        if (value.length > 0) {
            // Adiciona o primeiro grupo
            formattedValue += `${value.slice(0, 3)}`;

            if (value.length > 3) {
                // Adiciona o segundo grupo
                formattedValue += `.${value.slice(3, 6)}`;

                if (value.length > 6) {
                    // Adiciona o terceiro grupo
                    formattedValue += `.${value.slice(6, 9)}`;

                    if (value.length > 9) {
                        // Adiciona o quarto grupo
                        formattedValue += `.${value.slice(9, 12)}`;
                    }
                }
            }
        }

        return formattedValue;
    };

    const [defaultPicture, setDefaultPicture] = personPicture;
    const [addImage, setAddImage] = useState(false);

    function insertPicture(file) {
        if (file) {
            if (file.name !== 'defaultProfilePicture.png') setAddImage(true);
            const reader = new FileReader();

            reader.onload = () => {
                const base64String = reader.result;
                setPersonPicture(base64String);
            };

            reader.readAsDataURL(file);
        }
    }

    async function loadImage() {
        try {
            // Carregar a imagem usando o endereço de diretório defaultProfilePicture
            const response = await fetch(defaultProfilePicture);
            const blob = await response.blob();

            // Criar um objeto de arquivo (File) a partir do blob da imagem
            const file = new File([blob], 'defaultProfilePicture.png');

            // Chamar a função insertPicture com o arquivo de imagem
            insertPicture(file);
        } catch (error) {
            console.error('Erro ao carregar a imagem:', error);
        }
    }

    function removePicture(modal) {
        setPersonPicture("");
        loadImage();

        const fileInput = document.getElementById(`fileInput${modal}`);
        if (fileInput) {
            fileInput.value = '';
        }

        setAddImage(false);
    };

    function handleImageClick(modal) {
        const fileInput = document.getElementById(`fileInput${modal}`);
        fileInput.click();
    }

    function effects() {

        useEffect(() => {
            handleCpfCnpj(personCpfCnpj);
        }, [identifyCpfCnpj]);

        useEffect(() => {
            handleRgIe(personRgIe);
        }, [identifyRgIe]);

    }

    return {
        // Atributos
        personPicture,
        setPersonPicture,
        personName,
        setPersonName,
        personEmail,
        setPersonEmail,
        personTelephone,
        setPersonTelephone,
        personCpfCnpj,
        setPersonCpfCnpj,
        personRgIe,
        setPersonRgIe,

        // Erros
        errorPersonPicture,
        errorPersonName,
        errorPersonEmail,
        errorPersonTelephone,
        errorPersonCpfCnpj,
        errorPersonRgIe,

        // Funções Essencias
        getData,
        setData,
        setError,
        clearData,
        clearError,
        verifyData,

        // Variáveis e Funções de Controle
        identifyCpfCnpj,
        setIdentifyCpfCnpj,
        identifyRgIe,
        setIdentifyRgIe,
        handlePhone,
        handleCpfCnpj,
        handleRgIe,
        closeIcon,
        addImage,
        insertPicture,
        removePicture,
        handleImageClick,
        effects
    };
}

export default PersonClass;
import { useState, useEffect } from 'react';
import ControlModule from '../../../object/modules/control';

function PersonClass() {
    const control = ControlModule();

    const [personName, setPersonName] = useState("");
    const [personEmail, setPersonEmail] = useState("");
    const [personTelephone, setPersonTelephone] = useState("");
    const [personCpfCnpj, setPersonCpfCnpj] = useState("");
    const [personRgIe, setPersonRgIe] = useState("");

    const [errorPersonName, setErrorPersonName] = useState("");
    const [errorPersonEmail, setErrorPersonEmail] = useState("");
    const [errorPersonTelephone, setErrorPersonTelephone] = useState("");
    const [errorPersonCpfCnpj, setErrorPersonCpfCnpj] = useState("");
    const [errorPersonRgIe, setErrorPersonRgIe] = useState("");

    function getData(object) {
        setPersonName(object.nomePessoa);
        setPersonEmail(object.emailPessoa);
        setPersonTelephone(object.telefonePessoa);
        setPersonCpfCnpj(object.cpfCnpjPessoa);
        setPersonRgIe(object.rgIePessoa);

        setIdentifyCpfCnpj(object.cpfCnpjPessoa?.length === 14 ? "cpf" : "cnpj");
        setIdentifyRgIe(object.rgIePessoa?.length === 12 ? "rg" : "ie");
    }

    function setData() {
        return {
            nomePessoa: personName,
            emailPessoa: personEmail,
            telefonePessoa: personTelephone,
            cpfCnpjPessoa: personCpfCnpj,
            rgIePessoa: personRgIe
        };
    }

    function clearData() {
        setPersonName('');
        setPersonEmail('');
        setPersonTelephone('');
        setPersonCpfCnpj('');
        setPersonRgIe('');
        setIdentifyCpfCnpj("cpf");
        setIdentifyRgIe("rg");
    };

    function clearError() {
        setErrorPersonName('');
        setErrorPersonEmail('');
        setErrorPersonTelephone('');
        setErrorPersonCpfCnpj('');
        setErrorPersonRgIe('');
    };

    function checkDataExists(persons, id, email, cpfCnpj, rgIe) {
        let emailExists = false;
        let cpfCnpjExists = false;
        let rgIeExists = false;

        if (id === 0) {
            emailExists = persons.some(object => object.emailPessoa === email);
            cpfCnpjExists = persons.some(object => object.cpfCnpjPessoa === cpfCnpj);
            rgIeExists = persons.some(object => object.rgIePessoa === rgIe);
        } else {
            emailExists = persons.some(object => object.id !== id && object.emailPessoa === email);
            cpfCnpjExists = persons.some(object => object.id !== id && object.cpfCnpjPessoa === cpfCnpj);
            rgIeExists = persons.some(object => object.id !== id && object.rgIePessoa === rgIe);
        }

        if (!emailExists) {
            const string = "devops@development.com";
            if (email === string) {
                emailExists = true;
            }
        }

        const status = emailExists || cpfCnpjExists || rgIeExists ? false : true;

        return { status, emailExists, cpfCnpjExists, rgIeExists };
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
            }
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
            }
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

    function verifyData(list, id) {
        clearError();
        let status = true;

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
                telephone = 'O telefone inválido: informe o número e ddd!';
                status = false;
            }
        } else {
            telephone = 'O telefone é requerido!';
            status = false;
        }

        if (personCpfCnpj) {

            const response = CpfCnpj(personCpfCnpj);

            if (response === -1) { cpfCnpj = 'CPF inválido!'; status = false; }
            else if (response === -2) { cpfCnpj = 'CNPJ inválido!'; status = false; }

        } else {
            cpfCnpj = 'O CPF ou CNPJ é requerido!';
            status = false;
        }

        if (personRgIe) {

            const response = RgIe(personRgIe);

            if (response === -1) { rgIe = 'RG inválido!'; status = false; }
            else if (response === -2) { rgIe = 'IE inválido!'; status = false; }

        } else {
            rgIe = 'O RG ou IE é requerido!';
            status = false;
        }

        if (list.some(object => true) && (!email || !cpfCnpj || !rgIe)) {
            const persons = list.map(object => ({
                id: object.id,
                emailPessoa: object.emailPessoa,
                cpfCnpjPessoa: object.cpfCnpjPessoa,
                rgIePessoa: object.rgIePessoa
            }));

            const response = checkDataExists(persons, id, personEmail, personCpfCnpj, personRgIe);

            status ? status = response.status : null;
            if (response.emailExists) {
                email = 'O e-mail informado já existe!';
            }
            if (response.cpfCnpjExists) {
                personCpfCnpj.length === 14 ? cpfCnpj = 'O CPF informado já existe!' : cpfCnpj = 'O CNPJ informado já existe!';
            }
            if (response.rgIeExists) {
                personRgIe.length === 12 ? rgIe = 'O RG informado já existe!' : rgIe = 'A IE informada já existe!';
            }
        }

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
        errorPersonName,
        errorPersonEmail,
        errorPersonTelephone,
        errorPersonCpfCnpj,
        errorPersonRgIe,

        // Funções Essencias
        getData,
        setData,
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
        effects
    };
}

export default PersonClass;
class State {

    constructor() {
        this.stateName = '';
        this.stateUf = '';
        this.stateId = '';
        this.errorStateName = '';
        this.errorStateUf = '';
    };

    setStateName(name) {
        this.stateName = name;
    };

    setStateUf(uf) {
        this.stateUf = uf;
    };

    setStateId(id) {
        this.stateId = id;
    };

    getDatas(object) {
        this.stateName = object.nomeEstado;
        this.stateUf = object.ufEstado;
        this.stateId = object.id;
    };

    setDatas() {
        return {
            id: this.stateId,
            nomeEstado: this.stateName,
            ufEstado: this.stateUf
        };
    };

    clearData() {
        this.stateName = '';
        this.stateUf = '';
        this.stateId = '';
    };

    clearErrors() {
        this.errorStateName = '';
        this.errorStateUf = '';
    };

    verifyData() {
        this.clearErrors();
        let status = true;

        if (this.stateName) {
            if (this.stateName.length < 3) {
                this.errorStateName = 'O nome precisa ter no mínimo 3 letras!';
                status = false;
            }
        } else {
            this.errorStateName = 'O nome é requerido!';
            status = false;
        }

        if (this.stateUf) {
            if (this.stateUf.length < 2) {
                this.errorStateUf = 'A sigla precisa ter 2 letras!';
                status = false;
            }
        } else {
            this.errorStateUf = 'A sigla é requerida!';
            status = false;
        }

        return status;
    };

}
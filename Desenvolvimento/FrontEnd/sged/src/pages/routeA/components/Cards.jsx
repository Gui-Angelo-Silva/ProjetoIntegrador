import ImgImovel from "../../../assets/ImgImovel.png"
import ImgEstado from "../../../assets/ImgEstado.png";
import ImgCidade from "../../../assets/ImgCidade.png";
import ImgLogradouro from "../../../assets/ImgLogradouro.png";
import ImgTipoLogradouro from "../../../assets/ImgTipoLogradouro.png";
import ImgUsuario from "../../../assets/ImgUsuarioAtualizada.png";
import ImgBairro from "../../../assets/ImgBairro.png";
import ImgTipoUsuario from "../../../assets/ImgTipoUsuarioAtualizada.png";
import ImgMunicipe from "../../../assets/ImgMunicipeAtualizada.png";
import ImgEngenheiro from "../../../assets/ImgEngenheiroAtualizada.png";
import ImgFiscal from "../../../assets/ImgFiscalAtualizada.png";
import ImgAuditoria from "../../../assets/ImgAuditoriaAtualizada.png";
import ImgProcesso from "../../../assets/ImgProcessoAtualizada.png";
import ImgTipoProcesso from "../../../assets/ImgTipoProcessoAtualizada.png";
import ImgEtapa from "../../../assets/ImgEtapaAtualizada.png";
import ImgTipoDocumento from "../../../assets/ImgTipoDocumentoAtualizada.png";
import ImgDocumentoProcesso from "../../../assets/ImgDocumentoProcessoAtualizada.png";

import { useServer } from "../../../routes/serverRoute";

function Cards() {

    const { addSegment, inDevelopment } = useServer();

    const dataCategory = {
        "Imóvel": [
            {
                onClick: () => inDevelopment("Controle de Imóvel"),
                image: ImgImovel,
                tooltip: "Abrir a Página de Controle de Imóvel",
                title: "Imóvel",
                module: "Imovel"
            },
            {
                onClick: () => addSegment("state"),
                image: ImgEstado,
                tooltip: "Abrir a Página de Controle de Estado",
                title: "Estado",
                module: "Imovel"
            },
            {
                onClick: () => addSegment("city"),
                image: ImgCidade,
                tooltip: "Abrir a Página de Controle de Cidade",
                title: "Cidade",
                module: "Imovel"
            },
            {
                onClick: () => addSegment("neighborhood"),
                image: ImgBairro,
                tooltip: "Abrir a Página de Controle de Bairro",
                title: "Bairro",
                module: "Imovel"
            },
            {
                onClick: () => inDevelopment("Controle de Logradouro"),
                image: ImgLogradouro,
                tooltip: "Abrir a Página de Controle de Logradouro",
                title: "Logradouro",
                module: "Imovel"
            },
            {
                onClick: () => addSegment("typepublicplace"),
                image: ImgTipoLogradouro,
                tooltip: "Abrir a Página de Controle de Tipo Logradouro",
                title: "Tipo Logradouro",
                module: "Imovel"
            }
        ],

        "Usuário": [
            {
                onClick: () => addSegment("user"),
                image: ImgUsuario,
                tooltip: "Abrir a Página de Controle de Usuário",
                title: "Usuário",
                module: "Usuario"
            },
            {
                onClick: () => addSegment("typeuser"),
                image: ImgTipoUsuario,
                tooltip: "Abrir a Página de Controle de Tipo Usuário",
                title: "Tipo Usuário",
                module: "Usuario"
            },
            {
                onClick: () => inDevelopment("Controle de Munícipe"),
                image: ImgMunicipe,
                tooltip: "Abrir a Página de Controle de Munícipe",
                title: "Munícipe",
                module: "Usuario"
            },
            {
                onClick: () => inDevelopment("Controle de Engenheiro"),
                image: ImgEngenheiro,
                tooltip: "Abrir a Página de Controle de Engenheiro",
                title: "Engenheiro",
                module: "Usuario"
            },
            {
                onClick: () => inDevelopment("Controle de Fiscal"),
                image: ImgFiscal,
                tooltip: "Abrir a Página de Controle de Fiscal",
                title: "Fiscal",
                module: "Usuario"
            },
            {
                onClick: () => inDevelopment("Controle de Auditoria"),
                image: ImgAuditoria,
                tooltip: "Abrir a Página de Controle de Auditoria",
                title: "Auditoria",
                module: "Usuario"
            },
        ],
        
        "Processo": [
            {
                onClick: () => inDevelopment("Controle de Processo"),
                image: ImgProcesso,
                tooltip: "Abrir a Página de Controle de Processo",
                title: "Processo",
                module: "Processo"
            },
            {
                onClick: () => inDevelopment("Controle de Tipo Processo"),
                image: ImgTipoProcesso,
                tooltip: "Abrir a Página de Controle de Tipo Processo",
                title: "Tipo Processo",
                module: "Processo"
            },
            {
                onClick: () => inDevelopment("Controle de Etapa"),
                image: ImgEtapa,
                tooltip: "Abrir a Página de Controle de Etapa",
                title: "Etapa",
                module: "Processo"
            },
            {
                onClick: () => inDevelopment("Controle de Tipo Documento"),
                image: ImgTipoDocumento,
                tooltip: "Abrir a Página de Controle de Tipo Documento",
                title: "Tipo Documento",
                module: "Processo"
            },
            {
                onClick: () => inDevelopment("Controle de Documento Processo"),
                image: ImgDocumentoProcesso,
                tooltip: "Abrir a Página de Controle de Documento Processo",
                title: "Doc. Processo",
                module: "Processo"
            }
        ]
    }
    
    return dataCategory
}

export default Cards;
import { tv } from "tailwind-variants";

const PopUp = {
    "SucessoGet": { message: 'Informações adquiridas com sucesso.' },
    "Erro": { message: 'Erro ao processar a requisição!' },
    "Alteração": { message: 'Informações adquiridas com sucesso' },
    "Exclusão": { message: 'Informações excluídas com sucesso' },
    "Desativar": { message: 'Informações desativadas com sucesso' },
    "Cadastrar": { message: 'Informações cadastradas com sucesso' }
}

const AcaoPopUp = ({ acao }) => {
    const style = tv({
        base: "border-t-4 rounded-b px-4 py-3 shadow-md",
        variants: {
            SucessoGet: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
            Alteração: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
            Exclusão: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
            Desativar: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
            Cadastrar: "bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md",
            Erro: "bg-red-100 border-t-4 border-teal-500 rounded-b text-red-900 px-4 py-3 shadow-md"
        }
    });

    const mensagem = PopUp[acao]?.message;
    if (!mensagem) return null;
    
    return (
        <div className={style[acao]} role="alert">
            <div className="flex">
                <div>
                    <p className="font-bold">Ação Realizada:</p>
                    <p className="text-sm">{mensagem}</p>
                </div>
            </div>
        </div>
    );
}

export default AcaoPopUp;

import { useEffect } from "react";

import { useMontage } from "../../../object/modules/montage";
import LayoutPage from "../../../components/Layout/LayoutPage";
import Title from "../../../components/Title/Title";

export default function Test() {

    const montage = useMontage();

    useEffect(() => {
        montage.componentMounted();
    }, []);

    return (
        <LayoutPage>
            <Title title="Perfil" />
            <div className="flex w-full flex-col justify-center">
                <div className="flex w-full justify-center pb-3">
                    <div className="flex justify-center items-center w-[150px] lg:w-[221px] h-[150px] lg:h-[221px] rounded-full bg-white border border-[#A7A7A7] shadow-md">Guigas</div>
                </div>
                <h1 className="text-center text-[15px] lg:text-[20px] text-[#636262] pb-1">Prefeitura de Jales</h1>
                <h3 className="text-center text-[13px] lg:text-[16px] text-[#636262]">prefeituraJales@pref.sp.gov.br</h3>
            </div>
            <div className="flex flex-col pt-3 gap-y-3">
                <div>
                    <h2 className="text-[15px] text-[#4E4D4D]">Nome Completo:</h2>
                    <input type="text" className="rounded-lg border-[#A7A7A7] w-[308px] h-[40px]" />
                </div>
                <div>
                    <h2 className="text-[15px] text-[#4E4D4D]">Telefone:</h2>
                    <input type="text" className="rounded-lg border-[#A7A7A7] w-[308px] h-[40px]" />
                </div>
                <div>
                    <h2 className="text-[15px] text-[#4E4D4D]">Cargo:</h2>
                    <input type="text" className="rounded-lg border-[#A7A7A7] w-[308px] h-[40px]" />
                </div>
                <div>
                    <h2 className="text-[15px] text-[#4E4D4D]">CPF:</h2>
                    <input type="text" className="rounded-lg border-[#A7A7A7] w-[308px] h-[40px]" />
                </div>
                <div>
                    <h2 className="text-[15px] text-[#4E4D4D]">RG:</h2>
                    <input type="text" className="rounded-lg border-[#A7A7A7] w-[308px] h-[40px]" />
                </div>
                <div>
                    <h2 className="text-[15px] text-[#4E4D4D]">Email:</h2>
                    <input type="text" className="rounded-lg border-[#A7A7A7] w-[308px] h-[40px]" />
                </div>
                <div>
                    <h2 className="text-[15px] text-[#4E4D4D]">Senha:</h2>
                    <input type="text" className="rounded-lg border-[#A7A7A7] w-[308px] h-[40px]" />
                </div>
                <div className="relative mt-16">
                    <div className="absolute bottom-0">
                        <button className="w-[130px] h-[48px] text-[15px] bg-[#2D636B] text-white rounded-lg">
                            Habilitar Edição
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="grid grid-cols-8 w-full mt-10">
                <div className="col-span-2 pt-2">
                    <div className="flex w-full flex-col justify-center">
                        <div className="flex w-full justify-center pb-3">
                            <div className="flex justify-center items-center w-[221px] h-[221px] rounded-full bg-white border border-[#A7A7A7] shadow-md">Guigas</div>
                        </div>
                        <h1 className="text-center text-[20px] text-[#636262] pb-1">Prefeitura de Jales</h1>
                        <h3 className="text-center text-[16px] text-[#636262]">prefeituraJales@pref.sp.gov.br</h3>
                    </div>
                </div>
                <div className="flex flex-col col-span-1 lg:col-span-4 h-[700px] rounded-xl border p-10 shadow-md lg:w-[800px]">
                    <div className="inline-flex gap-x-6">
                        <div className="flex flex-col pt-4 gap-y-2">
                            <h2 className="text-[20px] text-[#4E4D4D]">Nome Completo:</h2>
                            <input type="text" className="rounded-lg border-[#A7A7A7] w-[350px]" />
                        </div>
                        <div className="flex flex-col pt-4 gap-y-2">
                            <h2 className="text-[20px] text-[#4E4D4D]">Telefone:</h2>
                            <input type="text" className="rounded-lg border-[#A7A7A7] w-[350px]" />
                        </div>
                    </div>
                    <div className="inline-flex gap-x-6">
                        <div className="flex flex-col pt-4 gap-y-2">
                            <h2 className="text-[20px] text-[#4E4D4D]">CPF:</h2>
                            <input type="text" className="rounded-lg border-[#A7A7A7] w-[350px]" />
                        </div>
                        <div className="flex flex-col pt-4 gap-y-2">
                            <h2 className="text-[20px] text-[#4E4D4D]">RG:</h2>
                            <input type="text" className="rounded-lg border-[#A7A7A7] w-[350px]" />
                        </div>
                    </div>
                    <div className="inline-flex gap-x-6">
                        <div className="flex flex-col pt-4 gap-y-2">
                            <h2 className="text-[20px] text-[#4E4D4D]">Email:</h2>
                            <input type="text" className="rounded-lg border-[#A7A7A7] w-[350px]" />
                        </div>
                        <div className="flex flex-col pt-4 gap-y-2">
                            <h2 className="text-[20px] text-[#4E4D4D]">Cargo:</h2>
                            <input type="text" className="rounded-lg border-[#A7A7A7] w-[350px]" />
                        </div>
                    </div>
                    <div className="inline-flex gap-x-6">
                        <div className="flex flex-col pt-4 gap-y-2">
                            <h2 className="text-[20px] text-[#4E4D4D]">Senha:</h2>
                            <input type="password" className="rounded-lg border-[#A7A7A7] w-[350px]" />
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute top-48 left-[540px]">
                            <button className="w-[185px] h-[53px] bg-[#2D636B] text-white rounded-lg">
                                Habilitar Edição
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </LayoutPage>
    );
}
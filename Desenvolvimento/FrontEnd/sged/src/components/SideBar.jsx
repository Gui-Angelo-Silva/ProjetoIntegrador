import React from "react";
import { Sidebar } from 'flowbite-react';
import { HiUser, HiDesktopComputer, HiUsers } from 'react-icons/hi';

export default function SideBar(){
    return (
        <Sidebar aria-label="Sidebar with multi-level dropdown example">
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiDesktopComputer}>
                Página Inicial
              </Sidebar.Item>
              <Sidebar.Collapse icon={HiUser} label="Atendente">
                <Sidebar.Item href="#">Products</Sidebar.Item>
                <Sidebar.Item href="#">Sales</Sidebar.Item>
                <Sidebar.Item href="#">Refunds</Sidebar.Item>
              </Sidebar.Collapse>
              <Sidebar.Collapse icon={HiUsers} label="Perfil Público">
                <Sidebar.Item href="#">Munícipe</Sidebar.Item>
                <Sidebar.Item href="#">Fiscal</Sidebar.Item>
                <Sidebar.Item href="#">Engenheiro</Sidebar.Item>
                <Sidebar.Item href="#">Estagiário</Sidebar.Item>
              </Sidebar.Collapse>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
    )
}
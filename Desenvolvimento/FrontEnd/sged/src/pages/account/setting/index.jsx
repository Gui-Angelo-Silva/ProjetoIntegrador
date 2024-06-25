import React from 'react'
import LayoutPage from '../../../components/Layout/LayoutPage'
import Title from '../../../components/Title/Title'

const Setting = () => {
  return (
    <LayoutPage>
        <Title title="Configurações"/>
        <div className='mr-5 mt-4 border-2 border-red-900 p-3'>
            <div className='bg-[#59C3D3]/25 px-2 py-3 rounded-md'>
                <h1>Geral</h1>
            </div>
        </div>
    </LayoutPage>
  )
}

export default Setting
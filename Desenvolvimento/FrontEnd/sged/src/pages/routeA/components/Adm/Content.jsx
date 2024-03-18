import NavBarAdm from './NavBarAdm'
import AppRoutes from '../../../../routes/routes'

const Content = () => {
  return (
    <div className='ml-[100px] sm:ml-[200px] md:ml-[250px] lg:ml-[260px] w-full '>
      <div className='sticky top-0 z-10'>
        <NavBarAdm />
      </div>
      {/* <AppRoutes /> */}
    </div>
  )
}

export default Content
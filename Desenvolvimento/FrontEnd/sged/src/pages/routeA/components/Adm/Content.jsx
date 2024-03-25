import NavBarAdm from './NavBarAdm'
import AppRoutes from '../../../../routes/routes'

const Content = () => {
  return (
    <div className='ml-[40px] sm:ml-[200px] md:ml-[250px] lg:ml-[260px] w-full overflow-hidden'>
      <NavBarAdm />
      <div className="flex-1 overflow-auto">
        <AppRoutes />
      </div>
    </div>
  )
}

export default Content
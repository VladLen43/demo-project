import { Outlet } from 'react-router-dom'
import classes from './App.module.scss'
import { MainPage } from './MainPage/index.tsx'
import MoonlightIcon from '../assets/moonlight.svg'

export const App = () => {
  if (__PLATFORM__ === 'desktop') {
    return <div>isDesktop</div>
  }

  if (__PLATFORM__) {
    return <div>isMobile</div>
  }

  return (
    <div className={classes.container}>
      <h1>Platform: {__PLATFORM__}</h1>
      <MoonlightIcon className={classes.svg} />
      <MainPage />
      <Outlet />
    </div>
  )
}

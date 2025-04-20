import { To, useLocation, useNavigate } from 'react-router-dom'

export const MainPage = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  return (
    <div>
      {
        <button onClick={() => navigate(pathname === '/' ? '/counter' : (-1 as To))}>
          {pathname === '/' ? 'Counter' : 'Back'}
        </button>
      }
    </div>
  )
}

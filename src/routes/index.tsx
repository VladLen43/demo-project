import { lazy, Suspense } from 'react'

const LazyAppPage = lazy(() => import('../components/App.tsx').then((module) => ({ default: module.App })))
const LazyCounterPage = lazy(() =>
  import('../pages/CounterPage/index.tsx').then((module) => ({ default: module.CounterPage })),
)

export const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={'Loading...'}>
        <LazyAppPage />
      </Suspense>
    ),
    children: [
      {
        path: 'counter',
        element: (
          <Suspense fallback={'Loading...'}>
            <LazyCounterPage />
          </Suspense>
        ),
      },
    ],
  },
]

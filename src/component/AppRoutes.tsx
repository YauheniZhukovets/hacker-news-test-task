import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { HomePage, StoryPage } from 'app'
import { routes } from 'shared'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<HomePage />} />
      <Route path={`${routes.HOME}:id`} element={<StoryPage />} />
      <Route path={'*'} element={<Navigate to={routes.HOME} replace />} />
    </Routes>
  )
}

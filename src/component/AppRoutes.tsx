import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { HomePage } from '../app/HomePage'
import { StoryPage } from '../app/StoryPage'
import { routes } from '../shared/routes'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<HomePage />} />
      <Route path={`${routes.HOME}:id`} element={<StoryPage />} />
      <Route path={'*'} element={<Navigate to={routes.HOME} replace />} />
    </Routes>
  )
}

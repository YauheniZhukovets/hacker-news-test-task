import React, { FC, useEffect } from 'react'

import { Layout, message, Spin, Typography } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { useNavigate } from 'react-router-dom'
import { useDebounce } from 'usehooks-ts'

import { AppRoutes } from '../component/AppRoutes'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { routes } from '../shared/routes'
import { setError } from '../store/action/appAction'
import { fetchStoryIds } from '../store/thunk/storyThunks'
import { NullAnd } from '../type/NullAnd'

const { Title } = Typography

export const App: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const ids = useAppSelector<number[]>(state => state.story.ids)
  const debouncedStoryIds = useDebounce<number[]>(ids, 60000)
  const error = useAppSelector<NullAnd<string>>(state => state.app.error)

  useEffect(() => {
    if (error) {
      message.error(error)
    }

    return () => {
      setTimeout(() => {
        dispatch(setError(null))
      }, 2000)
    }
  }, [error])

  useEffect(() => {
    dispatch(fetchStoryIds())
  }, [debouncedStoryIds])

  const onClickTitleHandler = () => {
    navigate(routes.HOME)
  }

  if (!ids.length) {
    return (
      <Spin tip="Loading...">
        <div style={{ minHeight: '100vh' }}></div>
      </Spin>
    )
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
        <Title
          style={{ color: '#d0CCCC', cursor: 'pointer', margin: 0 }}
          level={3}
          onClick={onClickTitleHandler}
        >
          Hacker-News
        </Title>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px', margin: '16px 0' }}>
        <AppRoutes />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Hacker News ©2023 Created by Yauheni Zhukovets
      </Footer>
    </Layout>
  )
}

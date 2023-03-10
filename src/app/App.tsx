import React, { FC, memo, useEffect } from 'react'

import { Layout, message, Typography } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { useNavigate } from 'react-router-dom'

import { routes } from '../shared'

import { AppRoutes } from 'component'
import { useAppDispatch, useAppSelector } from 'hooks'
import { fetchStories, fetchStoryIds, setError } from 'store'
import { NullAnd } from 'type'

const { Title } = Typography

export const App: FC = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const error = useAppSelector<NullAnd<string>>(state => state.app.error)
  const ids = useAppSelector<number[]>(state => state.story.ids)

  useEffect(() => {
    dispatch(fetchStoryIds())
  }, [])

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
    const interval = setInterval(() => {
      dispatch(fetchStoryIds())
    }, 60000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (ids.length) {
      dispatch(fetchStories())
    }
  }, [ids])

  const onClickTitleHandler = () => {
    navigate(routes.HOME)
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
})

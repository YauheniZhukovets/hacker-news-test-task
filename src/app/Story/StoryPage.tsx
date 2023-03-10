import React, { FC, memo, useEffect } from 'react'

import { LeftCircleOutlined } from '@ant-design/icons'
import { Button, Descriptions, Space } from 'antd'
import { unix } from 'moment'
import { NavLink, useParams } from 'react-router-dom'

import { CommentsPage } from '../Comment'

import { useAppDispatch, useAppSelector } from 'hooks'
import { IStory } from 'models'
import { routes } from 'shared'
import { fetchStory, refreshComment, setOneStory } from 'store'

export const StoryPage: FC = memo(() => {
  const dateFormat = 'DD-MM-YYYY'
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const story = useAppSelector<IStory>(state => state.story.story)

  useEffect(() => {
    dispatch(setOneStory({} as IStory))
    dispatch(refreshComment())
    if (id) {
      dispatch(fetchStory(id))
    }
  }, [])

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{ display: 'flex', margin: '0 auto', minWidth: '200px', maxWidth: '70%' }}
    >
      <NavLink to={routes.HOME}>
        <Button>
          <LeftCircleOutlined />
        </Button>
      </NavLink>

      {story.id && (
        <>
          <Descriptions title={story.title} layout="vertical">
            <Descriptions.Item span={3} label="Link To News">
              <a href={story.url} target="_blank" rel="noreferrer">
                {story.url}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Date">
              {unix(story.time).format(dateFormat)}
            </Descriptions.Item>
            <Descriptions.Item label="Author">{story.by}</Descriptions.Item>
            <Descriptions.Item label="Comment Count">{story.descendants}</Descriptions.Item>
          </Descriptions>

          <CommentsPage sId={story.id} ids={story.kids ? story.kids : []} />
        </>
      )}
    </Space>
  )
})

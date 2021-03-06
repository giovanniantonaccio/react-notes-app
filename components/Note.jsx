import {
  message,
  Button,
  Card,
  Col,
  Input,
  Popover,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
  Checkbox,
} from 'antd'
import React, { useState } from 'react'
import {
  MoreOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import Avatar from 'antd/lib/avatar/avatar'
import { parseISO, formatDistance } from 'date-fns'
import NoteTitle from './NoteTitle'
import NoteContent from './NoteContent'

const { Text } = Typography
import api from '../services/api'

export default function Note({
  id,
  tags: xTags,
  title: xTitle,
  content: xContent,
  created_by,
  updated_at,
  onDelete,
  isPrivate: xIsPrivate,
}) {
  const [title, setTitle] = useState(xTitle)
  const [content, setContent] = useState(xContent)
  const [tags, setTags] = useState(xTags)
  const [isPrivate, setIsPrivate] = useState(xIsPrivate)

  const [isEditingMode, setIsEditingMode] = useState(false)
  const [isAddingTag, setIsAddingTag] = useState(false)

  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))

  const handleAddTag = e => {
    setTags([...tags, e.target.value])
    setIsAddingTag(false)
  }

  const handleDeleteTag = tag => {
    const newTags = [...tags]
    const index = newTags.indexOf(tag)
    if (index > -1) {
      newTags.splice(index, 1)
      setTags(newTags)
    }
  }

  const handleSaveNote = () => {
    if (title === '') {
      message.error('Title cannot be empty')
      return
    }
    if (content === '') {
      message.error('Content cannot be empty')
      return
    }
    setIsAddingTag(false)
    setIsEditingMode(false)
    api
      .put(`/notes/${id}/`, {
        title: title,
        page_url: document.URL,
        thumbs_count: 0,
        anchor: 'any_anchor',
        created_by: loginInfo.username,
        tag: {
          title: tags[0],
        },
        content: content,
        type: isPrivate ? 'PER' : 'GLO',
      })
      .then(() => {
        message.success('Note updated')
        onSave()
      })
      .catch(() => {
        message.error('Failed to update note.')
      })
  }

  const handleDeleteNote = () => {
    console.log('delete', id)
    api
      .delete(`/notes/${id}`)
      .then(() => {
        message.success('Note removed')
        onDelete()
      })
      .catch(() => message.error('Failed to remove note'))
  }

  const handleCancel = () => {
    setIsAddingTag(false)
    setIsEditingMode(false)
    setTitle(xTitle)
    setContent(xContent)
    setTags(xTags)
    setIsPrivate(xIsPrivate)
  }

  const ContextMenu = (
    <div style={{ margin: '-12px -16px', width: '120px' }}>
      <Col>
        <Button
          type="text"
          style={{ width: '100%', color: '#1890ff' }}
          icon={<EditOutlined />}
          onClick={() => setIsEditingMode(true)}
        >
          Edit
        </Button>
        <Button
          type="text"
          style={{ width: '100%', color: 'red' }}
          icon={<DeleteOutlined />}
          onClick={handleDeleteNote}
        >
          Delete
        </Button>
      </Col>
    </div>
  )

  return (
    <Card
      title={
        <NoteTitle editing={isEditingMode} onChange={setTitle} title={title} />
      }
      extra={
        !isEditingMode && (
          <Popover placement="bottomRight" content={ContextMenu}>
            <Tooltip title="Menu">
              <Button type="text" shape="circle" icon={<MoreOutlined />} />
            </Tooltip>
          </Popover>
        )
      }
      style={{ width: '100%' }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Row align="middle">
          <Avatar size="small" icon={<UserOutlined />} />
          <Text italic style={{ marginLeft: '8px', color: 'gray' }}>
            {created_by}
          </Text>
        </Row>

        <NoteContent
          isEditing={isEditingMode}
          onChange={setContent}
          content={content}
        />

        <Row gutter={[8, 8]}>
          {tags.map(tag => (
            <Tag
              key={tag}
              closable={isEditingMode}
              onClose={() => handleDeleteTag(tag)}
            >
              {tag}
            </Tag>
          ))}
          {isEditingMode && !isAddingTag && (
            <Tooltip title="Add new tag">
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                size="small"
                onClick={() => setIsAddingTag(!isAddingTag)}
              >
                Add tag
              </Button>
            </Tooltip>
          )}
          {isAddingTag && (
            <Input placeholder="Add new tag..." onPressEnter={handleAddTag} />
          )}
        </Row>

        <Row>
          <Text italic style={{ color: 'gray' }}>
            Last change: {formatDistance(parseISO(updated_at), new Date())}
          </Text>
        </Row>

        {isEditingMode && (
          <>
            <Row justify="start">
              <Checkbox
                onChange={e => setIsPrivate(e.target.checked)}
                checked={isPrivate}
              >
                Make it private
              </Checkbox>
            </Row>
            <Row justify="end">
              <Space>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  type="primary"
                  onClick={handleSaveNote}
                  disabled={isAddingTag}
                >
                  Save
                </Button>
              </Space>
            </Row>
          </>
        )}
      </Space>
    </Card>
  )
}

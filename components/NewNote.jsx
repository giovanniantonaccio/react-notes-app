import {
  message,
  Button,
  Card,
  Input,
  Row,
  Space,
  Tag,
  Tooltip,
  Checkbox,
} from 'antd'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'

import NoteTitle from './NoteTitle'
import NoteContent from './NoteContent'
import api from '../services/api'

export default function NewNote({ onSave, onCancel }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState([])
  const [isAddingTag, setIsAddingTag] = useState(false)
  const [isPrivate, setIsPrivate] = useState(false)

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
    console.log('logininfo', loginInfo)
    if (title === '') {
      message.error('Title cannot be empty')
      return
    }
    if (content === '') {
      message.error('Content cannot be empty')
      return
    }
    setIsAddingTag(false)
    api
      .post('/notes/', {
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
        message.success('New note added!')
        onSave()
      })
      .catch(() => {
        message.error('Failed to add new note.')
      })
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <Card
      title={<NoteTitle editing={true} onChange={setTitle} title={title} />}
      style={{ width: '100%' }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <NoteContent isEditing onChange={setContent} content="" />

        <Row gutter={[8, 8]}>
          {tags.map(tag => (
            <Tag key={tag} closable onClose={() => handleDeleteTag(tag)}>
              {tag}
            </Tag>
          ))}
          {!isAddingTag && (
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
        <Row justify="start">
          <Checkbox onChange={e => setIsPrivate(e.target.checked)}>
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
      </Space>
    </Card>
  )
}

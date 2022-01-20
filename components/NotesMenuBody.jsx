import { Button, Col, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import Note from './Note'
import NewNote from './NewNote'
import api from '../services/api'

// const mock = [
//   {
//     id: "1",
//     tags: ["INFO"],
//     title: "TESTING 1",
//     type: "GLO",
//     page_url: "https://www.djangoproject.com/",
//     anchor: "lorem ipsum",
//     thumbs_count: 2,
//     created_by: "Giovanni Antonaccio",
//     content:
//       "Ant Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a design language for background applications.",
//     created_at: "2019-10-31T01:30:00.000-05:00",
//     updated_at: "2019-10-31T01:30:00.000-05:00",
//   },
//   {
//     id: "2",
//     tags: ["tag1", "tag2"],
//     title: "TESTING 2",
//     type: "GLO",
//     page_url: "https://www.djangoproject.com/",
//     anchor: "lorem ipsum",
//     thumbs_count: 2,
//     created_by: "Allison Barros",
//     content:
//       "In most business situations, Ant Design needs to solve a lot of information storage problems within the design area, so based on 12 Grids System, we divided the design area into 24 sections.",
//     created_at: "2019-10-31T01:30:00.000-05:00",
//     updated_at: "2019-10-31T01:30:00.000-05:00",
//   },
// ];

export default function NotesMenuBody() {
  const [notes, setNotes] = useState([])
  const [isAddingNewNote, setIsAddingNewNote] = useState(false)

  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))

  const fetchNotes = () => {
    api
      .get('/notes')
      .then(result => {
        console.log('data', result.data)
        setNotes(result.data)
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const onNewNoteSave = data => {
    setIsAddingNewNote(false)
    fetchNotes()
  }

  const onNewNoteCancel = () => {
    setIsAddingNewNote(false)
  }

  const onNoteDeletion = () => {
    fetchNotes()
  }

  const onNoteUpdate = () => {
    fetchNotes()
  }

  return (
    <Col>
      {!isAddingNewNote && (
        <Row
          justify="center"
          style={{ width: '100%', padding: '16px', background: '#fafafa' }}
        >
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setIsAddingNewNote(true)}
          >
            Add new note
          </Button>
        </Row>
      )}
      <Col
        style={{
          padding: '16px',
          paddingTop: 0,
          height: '100vh',
          overflow: 'auto',
          width: '100%',
        }}
      >
        <Space
          direction="vertical"
          style={{ width: '100%', marginBottom: '150px' }}
        >
          {isAddingNewNote && (
            <NewNote onSave={onNewNoteSave} onCancel={onNewNoteCancel} />
          )}

          {notes.length > 0 &&
            notes
              .filter(
                note =>
                  note.page_url === document.URL &&
                  note.created_by === loginInfo.username
              )
              .map(note => {
                return (
                  <Note
                    key={note.id}
                    id={note.id}
                    // tags={tags}
                    tags={[note.tag.title]}
                    title={note.title}
                    content={note.content}
                    created_by={note.created_by}
                    updated_at={note.updated_at}
                    onDelete={onNoteDeletion}
                    onUpdate={onNoteUpdate}
                    isPrivate={note.type === 'PER'}
                  />
                )
              })}
        </Space>
      </Col>
    </Col>
  )
}

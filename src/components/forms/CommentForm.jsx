import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

export default function CommentForm(props) {
  const [comment, setComment] = useState('');
  const defaultRows = 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit comment to server here
  }

  return (
    <div>
      <div className='text-center mb-3'>
        <h4>Escribe tu comentario acerca de esta película</h4>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control 
            as="textarea"
            placeholder="Comentar..."
            rows={props.rows || defaultRows}
            maxLength={255}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className='text-end'>
            <Form.Text className={comment.length === 255 ? 'message-error': ""}>
              { comment.length }/255
            </Form.Text>
          </div>
        </Form.Group>
        <Button
          className="mt-3"
          variant="primary"
          type="submit"
          style={{ width: '100%' }}
        >
        Comentar
        </Button>
      </Form>
    </div>
  )
}

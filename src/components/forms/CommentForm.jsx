import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import api from '../../config/axios/client-gateway';
import endpoints from '../../utils/endpoints';

export default function CommentForm(props) {
  const [comment, setComment] = useState('');
  const [isValidComment, setIsValidComment] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const defaultRows = 2;

  useEffect(() => {
    if (isSubmitted) {
      setIsValidComment(comment.trim() !== '');
    }
  }, [comment, isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!isSubmitted){
      setIsSubmitted(true);
      const commentValid = comment.trim() !== '';
      setIsValidComment(commentValid);
      
      if (commentValid) {
        setIsLoading(true);
        setIsValidComment(true);
        try{
          const response = await api.doPost(endpoints.CreateCommentFunction, {
            movie_id: parseInt(props.idMovie),
            user_id: parseInt(localStorage.getItem('userId')),
            comment: comment,
          });
          if(response && response.status === 200){
            Swal.fire({
              title: '¡Comentario publicado!',
              text: 'Gracias por tu comentario.',
              icon: 'success',
              confirmButtonText: 'Aceptar',
            });
            await props.fetchComments(props.idMovie);
            setIsSubmitted(false);
            setComment('');
            setIsValidComment(true);
          }
        }catch(error) {} finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

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
            onKeyDown={handleKeyDown}
            className={isValidComment ? '' : 'border-error'}
          />
          <div className='d-flex justify-content-between'>
            <div>
              {isSubmitted && !isValidComment && (
                <Form.Text className="message-error">
                  El comentario no puede estar vacío.
                </Form.Text>
              )}
            </div>
            <div className='text-end'>
              <Form.Text className={comment.length === 255 ? 'message-error' : ''}>
                { comment.length }/255
              </Form.Text>
            </div>
          </div>
        </Form.Group>
        <Button
          className="mt-3"
          variant="primary"
          type="submit"
          style={{ width: '100%' }}
          disabled={isLoading}
        >
        { !isLoading ? 'Comentar' : <Spinner size="sm" /> }
        </Button>
      </Form>
    </div>
  );
}

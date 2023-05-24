import { useState, useEffect } from 'react';
import { Form, Button, Select } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { RuleObject } from 'antd/es/form';
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { StyledForm } from 'pages/AddFlashcard/AddFlashcard.styled';
import { urls } from 'utils';
import type { IFlashcard } from 'pages';
import { useEditData } from 'hooks';
import { QueryKey } from 'enums';
import { Notification } from 'components';

export const EditFlashcard = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams<{ id: string }>();
  const [questionState, setQuestionState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [answerState, setAnswerState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const isRequired = (): RuleObject => ({
    required: true,
    message: 'Required!'
  });

  const options = [
    {
      value: 'frontend',
      label: 'Frontend'
    },
    {
      value: 'backend',
      label: 'Backend'
    }
  ];

  const fetchFlashcard = async () => {
    const { data } = await axios.get<never, AxiosResponse<IFlashcard>>(
      `${urls.flashcards}/${id}`,
      { params: { id } }
    );
    return data;
  };

  const {
    data,
    isError: isFlashcardError,
    error: flashcardError
  } = useQuery<IFlashcard, AxiosError>(
    [QueryKey.SingleFlashcard],
    fetchFlashcard
  );

  const { mutate } = useEditData<IFlashcard>(urls.flashcards, id);

  const onFinish = ({ category }: IFlashcard) => {
    const question = draftToHtml(
      convertToRaw(questionState.getCurrentContent())
    );
    const answer = draftToHtml(convertToRaw(answerState.getCurrentContent()));

    mutate(
      {
        id,
        question,
        answer,
        category
      },
      {
        onSuccess: () => {
          Notification({
            type: 'success',
            message: 'Flashcard has been succesfully edited!'
          });
          setTimeout(() => {
            navigate('/');
          }, 1000);
        },
        onError: (error: unknown) => {
          if (error instanceof AxiosError) {
            Notification({ type: 'error', message: error.message });
          } else {
            Notification({
              type: 'error',
              message: 'An error occurred while adding the flashcard.'
            });
          }
        }
      }
    );
  };

  useEffect(() => {
    if (data) {
      setQuestionState(
        EditorState.createWithContent(
          ContentState.createFromText(data.question || '')
        )
      );
      setAnswerState(
        EditorState.createWithContent(
          ContentState.createFromText(data.answer || '')
        )
      );
    }
  }, [data]);

  if (isFlashcardError)
    Notification({ type: 'error', message: flashcardError.message });

  return (
    <StyledForm>
      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item name='category' label='Category' rules={[isRequired]}>
          <Select options={options} />
        </Form.Item>
        <Form.Item name='question' label='Question' rules={[isRequired]}>
          <Editor
            editorState={questionState}
            onEditorStateChange={setQuestionState}
            editorClassName='editor'
            toolbarClassName='toolbar'
            wrapperClassName='wrapper'
            ariaLabel='question'
          />
        </Form.Item>
        <Form.Item name='answer' label='Answer' rules={[isRequired]}>
          <Editor
            editorState={answerState}
            onEditorStateChange={setAnswerState}
            editorClassName='editor'
            toolbarClassName='toolbar'
            wrapperClassName='wrapper'
            ariaLabel='answer'
          />
        </Form.Item>
        <Button type='primary' htmlType='submit'>
          Update Flashcard
        </Button>
      </Form>
    </StyledForm>
  );
};

import { useState } from 'react';
import { Form, Button, Select } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { faker } from '@faker-js/faker';
import { RuleObject } from 'antd/es/form';
import { useNavigate } from 'react-router-dom';
import { IFlashcard } from 'pages';
import { Notification } from 'components';
import { useAddData } from 'hooks';
import { urls } from 'utils';
import { AxiosError } from 'axios';
import { StyledForm } from './AddFlashcard.styled';

export const AddFlashcard = (): JSX.Element => {
  const navigate = useNavigate();
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

  const { mutate: addFlashcard } = useAddData<IFlashcard>(urls.flashcards);

  const onFinish = ({ category }: IFlashcard) => {
    const question = draftToHtml(
      convertToRaw(questionState.getCurrentContent())
    );
    const answer = draftToHtml(convertToRaw(answerState.getCurrentContent()));

    addFlashcard(
      {
        id: faker.datatype.uuid(),
        question,
        answer,
        category
      },
      {
        onSuccess: () => {
          Notification({
            type: 'success',
            message: 'Flashcard has been succesfully added!'
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
          Add Flashcard
        </Button>
      </Form>
    </StyledForm>
  );
};

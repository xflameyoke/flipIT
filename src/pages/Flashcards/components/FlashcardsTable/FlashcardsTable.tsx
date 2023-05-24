import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Menu, MenuProps, Table, Modal } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DashOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { urls } from 'utils';
import { QueryKey } from 'enums';
import type { IFlashcard } from 'pages';
import { Notification } from 'components';
import { StyledButton, StyledNotification } from './FlashcardsTable.styled';

export const FlashcardsTable = (): JSX.Element => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [rowId, setRowId] = useState<string>('');
  const [rowTitle, setRowTitle] = useState<string>('');
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const fetchFlashcards = async () => {
    const { data } = await axios.get<never, AxiosResponse<IFlashcard[]>>(
      `${urls.flashcards}`
    );
    return data;
  };

  const {
    data,
    isLoading: isTableLoading,
    isError: isTableError,
    error: tableError
  } = useQuery<IFlashcard[], AxiosError>(
    [QueryKey.Flashcards],
    fetchFlashcards
  );

  const {
    mutate,
    isError: isDeleteError,
    error: deleteError
  } = useMutation<never, AxiosError, string>(
    (id) =>
      axios.delete(`${urls.flashcards}/:${id}`, {
        data: { id }
      }),
    {
      onSuccess: async () => {
        await queryClient.refetchQueries([QueryKey.Flashcards]);
        Notification({
          type: 'success',
          message: (
            <div>
              Flashcard: <b>{parse(rowTitle)}</b> has been succesfully deleted!
            </div>
          )
        });
      }
    }
  );

  const items: MenuProps['items'] = [
    {
      key: 'actions',
      children: [
        {
          label: <StyledButton>Edit</StyledButton>,
          key: 'edit'
        },
        {
          label: <StyledButton>Delete</StyledButton>,
          key: 'delete'
        }
      ]
    }
  ];

  const columns = [
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      render: (question: string) => <div>{parse(question)}</div>
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      render: (answer: string) => <div>{parse(answer)}</div>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: undefined, record: IFlashcard) => (
        <Menu
          expandIcon={<DashOutlined title='dash-svg' />}
          items={items}
          onClick={({ key }) => {
            if (key === 'delete') {
              showModal();
              setRowId(record.id);
              setRowTitle(record.question);
            } else {
              navigate(`/${record.id}`);
            }
          }}
        />
      )
    }
  ];

  if (isTableError)
    Notification({ type: 'error', message: tableError.message });
  if (isDeleteError)
    Notification({ type: 'error', message: deleteError.message });
  return (
    <>
      <StyledButton $btnWidth='300px' $btnMargin='10px 0'>
        <Link to='/addFlashcard'>ADD FLASHCARD</Link>
      </StyledButton>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        loading={isTableLoading}
        rowKey='id'
      />
      <Modal
        open={isModalOpen}
        title='Delete Flashcard'
        onCancel={() => setIsModalOpen(false)}
        onOk={() => {
          mutate(rowId);
          setIsModalOpen(false);
        }}
      >
        <StyledNotification>
          Are you sure to delete: <b>{parse(rowTitle)}</b>
        </StyledNotification>
      </Modal>
    </>
  );
};

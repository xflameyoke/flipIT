import { render, screen, urls } from 'utils';
import { FlashcardsTable } from 'pages';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer();

beforeEach(async () => {
  render(<FlashcardsTable />);
  const dropdownButton = await screen.findAllByRole('menuitem', {
    name: 'dash'
  });
  await userEvent.hover(dropdownButton[0]);
});

describe('FlashcardsTable', () => {
  it('error notification should be visible when error', async () => {
    server.use(
      rest.delete(`${urls.flashcards}/:id`, async (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    server.listen();
    const deleteButton = await screen.findByRole('button', {
      name: 'Delete'
    });
    await userEvent.click(deleteButton);
    const okButton = await screen.findByRole('button', { name: 'OK' });
    await userEvent.click(okButton);
    const notification = await screen.findByRole('alert');
    expect(notification).toBeInTheDocument();
  });

  it('delete button should be visible after hover dropdown menu icon', async () => {
    const deleteButton = await screen.findByRole('button', {
      name: 'Delete'
    });
    expect(deleteButton).toBeInTheDocument();
  });

  it('confirmation modal should be visible', async () => {
    const deleteButton = await screen.findByRole('button', {
      name: 'Delete'
    });
    await userEvent.click(deleteButton);
    const modalElement = await screen.findByRole('dialog');
    const okButton = await screen.findByRole('button', { name: 'OK' });
    const cancelButton = await screen.findByRole('button', {
      name: 'Cancel'
    });
    expect(modalElement).toBeInTheDocument();
    expect(okButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
  });

  it('delete flashcard button should be visible', async () => {
    const deleteButton = await screen.findByRole('button', {
      name: 'Delete'
    });
    await userEvent.click(deleteButton);
    const okButton = await screen.findByRole('button', { name: 'OK' });
    await userEvent.click(okButton);
    const tableElement = screen.queryByRole('cell', {
      name: 'What is JSX?'
    });
    expect(tableElement).not.toBeInTheDocument();
  });
});

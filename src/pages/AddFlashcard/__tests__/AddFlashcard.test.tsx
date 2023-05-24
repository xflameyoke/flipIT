import { render, screen, urls } from 'utils';
import { AddFlashcard } from 'pages';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer();

beforeEach(() => {
  render(<AddFlashcard />);
});

describe('AddFlashcard', () => {
  it('should display form inputs and submit button', () => {
    const addButton = screen.getByRole('button', {
      name: 'Add Flashcard'
    });
    const inputCategoryElement = screen.getByRole('combobox', {
      name: 'Category'
    });
    const inputQuestionElement = screen.getByRole('textbox', {
      name: 'question'
    });
    const inputAnswerElement = screen.getByRole('textbox', { name: 'answer' });
    expect(addButton).toBeInTheDocument();
    expect(inputCategoryElement).toBeInTheDocument();
    expect(inputQuestionElement).toBeInTheDocument();
    expect(inputAnswerElement).toBeInTheDocument();
  });

  it('should display error notification when server returns an error', async () => {
    server.use(
      rest.post(`${urls.flashcards}/:id`, async (req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    const inputCategoryElement = screen.getByRole('combobox', {
      name: 'Category'
    });
    const inputQuestionElement = screen.getByRole('textbox', {
      name: 'question'
    });
    const inputAnswerElement = screen.getByRole('textbox', { name: 'answer' });
    const addButton = screen.getByRole('button', {
      name: 'Add Flashcard'
    });

    await userEvent.click(inputCategoryElement);
    const frontendOption = await screen.findByText('Frontend');
    await userEvent.click(frontendOption);
    await userEvent.click(inputQuestionElement);
    await userEvent.click(inputAnswerElement);
    await userEvent.click(addButton);
    const notification = await screen.findByRole('alert');
    expect(notification).toBeInTheDocument();
  });
});

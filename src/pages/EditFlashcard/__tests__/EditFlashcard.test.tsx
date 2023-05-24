import { render, screen, urls } from 'utils';
import { EditFlashcard } from 'pages';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer();

beforeEach(() => {
  render(<EditFlashcard />);
});

describe('EditFlashcard', () => {
  it('should display input fields and update button', () => {
    const inputCategoryElement = screen.getByRole('combobox', {
      name: 'Category'
    });
    const inputQuestionElement = screen.getByRole('textbox', {
      name: 'question'
    });
    const inputAnswerElement = screen.getByRole('textbox', { name: 'answer' });
    const updateButton = screen.getByRole('button', {
      name: 'Update Flashcard'
    });
    expect(inputCategoryElement).toBeInTheDocument();
    expect(inputQuestionElement).toBeInTheDocument();
    expect(inputAnswerElement).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });
  it('error notification should be visible when error', async () => {
    server.use(
      rest.patch(`${urls.flashcards}/:id`, async (req, res, ctx) =>
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
    const updateButton = screen.getByRole('button', {
      name: 'Update Flashcard'
    });
    await userEvent.click(inputCategoryElement);
    const frontendOption = await screen.findByText('Frontend');
    await userEvent.click(frontendOption);
    await userEvent.click(inputQuestionElement);
    await userEvent.click(inputAnswerElement);
    await userEvent.click(updateButton);
    const notification = await screen.findByRole('alert');
    expect(notification).toBeInTheDocument();
  });
});

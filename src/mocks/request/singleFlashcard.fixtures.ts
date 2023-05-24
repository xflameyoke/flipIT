import { db } from 'mocks';
import { rest } from 'msw';
import type { IFlashcard } from 'pages';
import { urls } from 'utils';

export const singleFlashcard = [
  rest.get<IFlashcard[]>(`${urls.flashcards}/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    const findFlashcard = db.flashcard.findFirst({
      where: { id: { equals: id as string } }
    });
    return res(ctx.status(200), ctx.json(findFlashcard));
  })
];

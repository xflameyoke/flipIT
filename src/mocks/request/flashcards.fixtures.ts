import { db } from 'mocks';
import { rest } from 'msw';
import type { IFlashcard } from 'pages';
import { urls } from 'utils';

export const flashcards = [
  rest.get<IFlashcard[]>(urls.flashcards, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(db.flashcard.getAll()))
  )
];

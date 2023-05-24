import { db } from 'mocks';
import { rest } from 'msw';
import type { IFlashcard } from 'pages';
import { urls } from 'utils';

export const addFlashcard = [
  rest.post(urls.flashcards, async (req, res, ctx) => {
    const { id, question, answer, category }: IFlashcard = await req.json();
    const createFlashcard = db.flashcard.create({
      id,
      question,
      answer,
      category
    });
    return res(ctx.status(200), ctx.json({ post: createFlashcard }));
  })
];

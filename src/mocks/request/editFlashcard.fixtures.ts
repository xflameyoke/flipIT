import { db } from 'mocks';
import { rest } from 'msw';
import { IFlashcard } from 'pages';
import { urls } from 'utils';

export const editFlashcard = [
  rest.patch(`${urls.flashcards}/:id`, async (req, res, ctx) => {
    const { id, question, answer, category }: IFlashcard = await req.json();
    const updateFlashcard = db.flashcard.update({
      where: { id: { equals: id } },
      data: {
        question,
        answer,
        category
      }
    });
    return res(
      ctx.status(200),
      ctx.json({
        data: updateFlashcard
      })
    );
  })
];

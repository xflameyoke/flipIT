import { db } from 'mocks';
import { rest } from 'msw';
import { IFlashcard } from 'pages';
import { urls } from 'utils';

export const deleteFlashcard = [
  rest.delete(`${urls.flashcards}/:id`, async (req, res, ctx) => {
    const { id }: IFlashcard = await req.json();
    const delFlashcard = db.flashcard.delete({
      where: { id: { equals: id } }
    });
    return res(
      ctx.status(200),
      ctx.json({
        delete: delFlashcard
      })
    );
  })
];

import {
  addFlashcard,
  flashcards,
  deleteFlashcard,
  editFlashcard,
  singleFlashcard
} from 'mocks';
import { db } from './db';

export const handlers = [
  ...flashcards,
  ...addFlashcard,
  ...deleteFlashcard,
  ...editFlashcard,
  ...singleFlashcard,
  ...db.flashcard.toHandlers('rest')
];

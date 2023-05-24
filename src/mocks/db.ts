import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  flashcard: {
    id: primaryKey(String),
    question: String,
    answer: String,
    category: String
  }
});

db.flashcard.create({
  id: '1',
  question: 'What is JSX?',
  answer:
    'It is a syntax extension to JavaScript. It’s used to describe what the UI should look like. JSX produces React “elements”.',
  category: 'frontend'
});

db.flashcard.create({
  id: '2',
  question: 'Why JSX?',
  answer:
    'React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display. Instead of artificially separating technologies by putting markup and logic in separate files, React separates concerns with loosely coupled units called “components” that contain both.',
  category: 'frontend'
});

db.flashcard.create({
  id: '3',
  question: 'How can you embed expressions in JSX?',
  answer:
    'You can put any valid JavaScript expression inside the curly braces in JSX. For example, 2 + 2, user.firstName, or formatName(user) are all valid JavaScript expressions.',
  category: 'frontend'
});

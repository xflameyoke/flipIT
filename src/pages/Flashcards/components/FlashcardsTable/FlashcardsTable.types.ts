export type IFlashcard = {
  id: string;
  question: string;
  answer: string;
  category: 'backend' | 'frontend';
};

export type IProps = {
  $btnWidth?: string;
  $btnMargin?: string;
};

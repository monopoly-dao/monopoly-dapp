type Props = {
  question: string;
  answer: string;
};

export default function FAQItem({ question, answer }: Props) {
  return (
    <div className='flex flex-col gap-3'>
      <p className='font-playfair font-bold text-xl text-white leading-snug'>
        {question}
      </p>
      <p className='font-inter text-base text-white/80 leading-relaxed font-light'>
        {answer}
      </p>
    </div>
  );
}

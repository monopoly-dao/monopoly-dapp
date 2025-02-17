type Props = {
  question: string;
  answer: string;
};

export default function FAQItem({ question, answer }: Props) {
  return (
    <div>
      <p className='text-lg font-bold mb-4'>{question}</p>
      <p className='font-inter'>{answer}</p>
    </div>
  );
}

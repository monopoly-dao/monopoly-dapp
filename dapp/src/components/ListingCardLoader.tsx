import LoadingSkeleton from './LoadingSkeleton';

type Props = {
  isLoading?: boolean;
  cardNumber: number;
};

export default function ListingCardLoader({ isLoading, cardNumber }: Props) {
  return (
    <>
      {isLoading &&
        Array(cardNumber)
          .fill('')
          .map((_, id) => (
            <LoadingSkeleton key={id} containerClassName='h-[426px] w-full' />
          ))}
    </>
  );
}

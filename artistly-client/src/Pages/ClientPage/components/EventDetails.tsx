type Props = {
  eventDetails: string;
};

const EventDetails = ({ eventDetails }: Props) => {
  return (
    <div className="mt-12">
      <span className="font-medium text-lg">Detalii evenimente</span>
      <div className="bg-[#EEEEEE] mt-3 p-4 drop-shadow-default rounded-xl">
        <p>{eventDetails}</p>
      </div>
    </div>
  );
};

export default EventDetails;

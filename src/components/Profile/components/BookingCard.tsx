import { Card } from "antd";

const { Meta } = Card;

export const BookingCard = (props: any) => {
  const hotel = props.data;

  return (
    <Card
      title={hotel.name}
      hoverable
      style={{ width: 340 }}
      cover={<img alt="hotel" src={hotel.image} />}
    >
      <Meta title={hotel.address} description={hotel.city} />
      <Meta
        title={`Посетители: ${hotel.adult} взрослых и ${hotel.child} детей `}
      />
      <Meta
        title={`${hotel.dataArrival || "-"} – ${hotel.dataDeparture || "-"} (${
          hotel.days || "-"
        } д.)`}
        description={`Итого: ${hotel.sum || "0"}`}
      />
    </Card>
  );
};

import { Card } from "antd";

const { Meta } = Card;

export const BookingCard = (props: any) => (
  <Card
    title="Hotel Park Inn"
    hoverable
    style={{ width: 340 }}
    cover={
      <img
        alt="example"
        src="https://www.ggrasia.com/wp-content/uploads/2015/05/JW-Marriot-hotel-room-Galaxy-Macau-Phase-2-e1432637852679.jpg"
      />
    }
  >
    <Meta title="20 дек. 2018 - 13 янв. 2019" description="14 000 ₽" />
  </Card>
);

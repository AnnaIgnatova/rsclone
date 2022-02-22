import "./style.css";
import { useEffect, useState } from "react";
import { Form, Select, Button } from "antd";
import { tailFormItemLayout } from "../../../../constants/tailForm";
import { DateArrive } from "../../../../../Hotels/components/Dates/DateArrive";
import { DateLeave } from "../../../../../Hotels/components/Dates/DateLeave";
import { useParams } from "react-router";
import { AppState } from "../../../../../../store";
import { useSelector } from "react-redux";
import { GetUserDataResponse } from "../../../../../../api/getUserData.api";

const { Option } = Select;

type LayoutType = Parameters<typeof Form>[0]["layout"];

const FormBooking = (props: any) => {
  const data = props.data;
  const { id } = useParams();
  const [adult, setAdult] = useState("");
  const [child, setChild] = useState("");

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("horizontal");

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 },
        }
      : null;

  const priceDay = data.minrate;
  const valueDays = 1;
  const discount = priceDay * valueDays * 0.05;
  const extraService = 450;

  return (
    <Form
      {...formItemLayout}
      layout={formLayout}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
    >
      <div className="form-header">
        <h2 className="form-header_left">ID Отеля {id}</h2>
        <h2 className="form-header_right">{priceDay}₽ в сутки</h2>
      </div>

      <div className="date-booking">
        <DateArrive />
        <DateLeave />
      </div>

      <Form.Item>
        <div className="price-container">
          <div className="price">
            {priceDay}₽ x {valueDays} суток
          </div>
          <div className="price-total">{priceDay * valueDays}₽</div>
        </div>
      </Form.Item>

      <Form.Item>
        <div className="price-container">
          <div className="price-discount">Сбор за услуги: скидка 5%</div>
          <div className="discount-total">
            -{(priceDay * valueDays * 0.05).toFixed(2)}₽
          </div>
        </div>
      </Form.Item>

      <Form.Item>
        <div className="price-container">
          <div className="price-discount">Сбор за дополнительные услуги</div>
          <div className="discount-total">{extraService}₽</div>
        </div>
      </Form.Item>

      <Form.Item>
        <div className="price-container">
          <h3 className="price-discount">Итого</h3>
          <h3 className="discount-total">
            {(priceDay * valueDays - discount + extraService).toFixed(2)}₽
          </h3>
        </div>
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Забронировать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormBooking;

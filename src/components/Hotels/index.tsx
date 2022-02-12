/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-shadow */
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, AppState, getHotels, getIdByLocation } from "../../store";
import HotelCard from "./components/HotelCard";
import { filterComponents } from "./constants/filterParams";
import "./style.css";
import { Button } from "antd";

interface StateProps {
  hotels: any[];
  locationId: string;
  checkInDate: string;
  checkOutDate: string;
  adultsNum: string;
  childNum: string;
}
interface DispatchProps {
  getHotels: (request: any) => Promise<void>;
}
interface HotelsComponentParams {}
type HotelsComponentProps = StateProps & DispatchProps & HotelsComponentParams;

const HotelsComponent: React.FC<HotelsComponentProps> = (props) => {
  const {
    hotels,
    locationId,
    checkInDate,
    checkOutDate,
    adultsNum,
    childNum,
    getHotels,
  } = props;
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("hotels.json");
    //     const json = await response.json();
    //     setData(json.result);
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // };
    // fetchData();
    getHotels({ locationId, checkInDate, checkOutDate, adultsNum, childNum });
  }, []);
  console.log(hotels);

  return (
    <div className="hotels">
      <div className="container">
        <div className="hotels-filters">
          {filterComponents.map((component) => (
            <div className="filter-block">{component}</div>
          ))}
          <Button onClick={() => {}}>Применить</Button>
        </div>
        <div className="hotels-cards">
          <div className="hotels-cards-title">
            Номера, которые мы для вас подобрали
          </div>
          <div className="hotels-cards-container">
            {hotels.map((val) => {
              return <HotelCard data={val} />;
            })}
          </div>
          <div className="hotels-pagination">
            {[1, 2, 3, 4, 5].map((value, index) => (
              <div
                className={`page ${index === page ? "active-page" : ""}`}
                onClick={() => setPage(index)}
              >
                {value}
              </div>
            ))}
            <div
              className="next-page"
              onClick={() => {
                const newPage = page === 4 ? 0 : page + 1;
                setPage(newPage);
              }}
            >
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: AppState): StateProps => ({
  hotels: state.hotelsData.hotels,
  locationId: state.hotelsData.locationId,
  checkInDate: state.hotelsData.checkInDate,
  checkOutDate: state.hotelsData.checkOutDate,
  adultsNum: state.hotelsData.adultsNum,
  childNum: state.hotelsData.childNum,
});
const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
  getHotels: (request) => dispatch(getHotels(request)),
});

export const Hotels = connect(
  mapStateToProps,
  mapDispatchToProps
)(HotelsComponent);

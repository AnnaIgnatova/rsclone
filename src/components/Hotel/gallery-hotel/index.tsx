import ImageHotel from "./image-hotel";
import { useEffect, useState } from "react";
import "./style.css";

interface CollageInterface {
  idHotel: string;
}

const Collage = ({ idHotel }: CollageInterface) => {
  const testURL =
    "https://thumbs.gfycat.com/PotableEmbarrassedFrenchbulldog-max-1mb.gif";
  const [imageData, setImageData] = useState([
    { url_max: testURL },
    { url_max: testURL },
    { url_max: testURL },
    { url_max: testURL },
    { url_max: testURL },
  ]);

  useEffect(() => {
    let isComponentMounted = true;

    const fetchData = async () => {
      if (isComponentMounted) {
        try {
          const response = await fetch(
            `https://booking-com.p.rapidapi.com/v1/hotels/photos?locale=ru&hotel_id=${idHotel}`,
            {
              method: "GET",
              headers: {
                "x-rapidapi-host": "booking-com.p.rapidapi.com",
                "x-rapidapi-key":
                  "2189fd4ed5msh931f3fb548a96c3p1797d5jsn1bf4c8e6cd2c",
              },
            }
          );
          const json = await response.json();
          if (isComponentMounted) {
            setImageData(json);
          }
        } catch (error) {
          console.log("error", error);
        }
      }
    };

    setTimeout(() => {
      fetchData();
    }, 1000);
    return () => {
      isComponentMounted = false;
    };
  }, [idHotel]);

  return (
    <div className="collage">
      <div className="collage-right">
        <div className="collage-img_right collage-img">
          <ImageHotel urlPhoto={imageData[0].url_max} />
        </div>
      </div>
      <div className="collage-left">
        <div className="collage-img_left collage-img">
          <ImageHotel urlPhoto={imageData[1].url_max} />
        </div>
        <div className="collage-img_left collage-img">
          <ImageHotel urlPhoto={imageData[2].url_max} />
        </div>
      </div>
      <div className="collage-left">
        <div className="collage-img_left collage-img">
          <ImageHotel urlPhoto={imageData[3].url_max} />
        </div>
        <div className="collage-img_left collage-img">
          <ImageHotel urlPhoto={imageData[4].url_max} />
        </div>
      </div>
    </div>
  );
};

export default Collage;

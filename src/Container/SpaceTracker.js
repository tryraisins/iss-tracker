import { useState } from "react";
import Button from "../Components/Button";

const SpaceTracker = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [runTime, setRunTime] = useState("");

  const getData = async () => {
    const time = new Date();
    const uniqueId = time.getTime();
    const fetchData = await fetch(
      "//api.open-notify.org/iss-now.json?callback=" + uniqueId,
    );
    const resptext = await fetchData.text();

    const resp = await JSON.parse(
      resptext.replace(`${uniqueId.toString()}`, "").replace(/[()]/g, ""),
    ); //remove time-callback and brackets
    const respLatitude = resp.iss_position.latitude;
    const respLongitude = resp.iss_position.longitude;

    //where you will change position and time states
    setLatitude(respLatitude);
    setLongitude(respLongitude);
    setRunTime(time.toLocaleTimeString());
  };
  if (latitude === 0 || longitude === 0) {
    getData();
  }

  const toDegreesMinutesAndSeconds = (coordinate) => {
    const absolute = Math.abs(coordinate);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

    return degrees + "° " + minutes + "' " + seconds + '"';
  };

  const convertDMSLat = (lat) => {
    const latitude = toDegreesMinutesAndSeconds(lat);
    const latitudeCardinal = lat >= 0 ? "N" : "S";

    return "Latitude:  " + latitudeCardinal + " " + latitude;
  };

  const convertDMSLNG = (lng) => {
    const longitude = toDegreesMinutesAndSeconds(lng);
    const longitudeCardinal = lng >= 0 ? "E" : "W";

    return "Longitude: " + longitudeCardinal + " " + longitude + " ";
  };

  return (
    <div className='col-12  rounded bg-secondary  bg-gradient bg-opacity-75 text-center m-5'>
      <h2 className=' text-uppercase fw-bolder mt-1 '>
        international space station tracker
      </h2>
      <h4>
        The International Space Station is moving at close to 28,000 km/h so its
        location changes really fast! Where is it right now?
      </h4>
      <Button launch={getData} />

      <h5 className='fw-bolder fs-4 marmalade'>
        As at {runTime}, the International Space Station is orbiting the earth
        at: <br />
        {convertDMSLat(latitude)} <br />
        {convertDMSLNG(longitude)}
      </h5>
    </div>
  );
};

export default SpaceTracker;

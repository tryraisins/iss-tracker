import React from "react";
import { useState, useEffect } from "react";

const People = () => {
  const [list, setList] = useState([]);
  const [listNumber, setListNumber] = useState(0);
  //   const [PeopleList, setPeopleList] = useState([]);
  const getData = async () => {
    const fetchUrl = await fetch("http://api.open-notify.org/astros.json");
    const resp = await fetchUrl.json();
    const PeopleNumber = await resp.number;
    setListNumber(await PeopleNumber);
    const PeopleData = await resp.people.map((itm) => {
      return (
        <p>
          {itm.name} in the {itm.craft} Spacecraft
        </p>
      );
    });
    setList(await PeopleData);
  };

  useEffect(() => {
    getData();
  });
  if (list.length === 0) {
    return (
      <div>
        <h1 className='tc ttu text-uppercase'>loading...</h1>
      </div>
    );
  } else {
    return (
      <div className='col-12  rounded bg-secondary  bg-gradient bg-opacity-75 text-center m-2'>
        <h2 className=' text-uppercase fw-bolder mt-3'>
          how many people are in space?
        </h2>
        <div className='mt-2'>
          <h5 id='placement' className=' fw-bolder fs-4 marmalade'>
            <p>There are currently {listNumber} people in space: </p>
            {list}
          </h5>
        </div>
      </div>
    );
  }
};

export default People;

// libs
import React, { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import Image from "next/image";
import "animate.css";
import "react-toastify/dist/ReactToastify.css";

// assets
import closeIcon from "../public/cancel.png"

// helpers
import { checkHaveCity, manageLocalStorage, routerPush } from "../helpers/functions";
import { toastConfig, api_url, api_key } from "../helpers/constants"

// styles
import styles from "../styles/Home.module.css";

export default function Home({ data }) {
  const [citySearch, setCitySearch] = useState();
  const [cities, setCities] = useState();
  const hasMounted = useRef(false)

  function removeCity(index) {
    const citiesArray = cities;
    citiesArray.splice(index, 1);
    localStorage.setItem('citiesArray', JSON.stringify(citiesArray));
    routerPush({ home: true })
  }

  function configCity() {
    const citiesLocalStorage = JSON.parse(localStorage.getItem('citiesArray')) ?? [];


    if (data?.error) toast.error(data.error, toastConfig);
    else if (data && checkHaveCity({ city: data, cities: citiesLocalStorage })) toast.error("City already registered!", toastConfig);
    else {
      citiesLocalStorage.splice(0, 0, data);
      localStorage.setItem('citiesArray', JSON.stringify(citiesLocalStorage));
    }

    setCities([...citiesLocalStorage]);
  }

  function onChangeCitySearch(e) {
    const val = e?.target?.value;
    if (val != null && val != undefined) setCitySearch(val);
  }

  function pushRoute() {
    if (citySearch) routerPush({ citySearch })
    else toast.error('Invalid Search Value', toastConfig);
  }

  useEffect(() => {
    if (!hasMounted.current) {
      manageLocalStorage();
      configCity();

      hasMounted.current = true;
    }
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.appTitle}>Weather App</h1>
        <div className={styles.form}>
          <input onChange={onChangeCitySearch} placeholder="Search for a city" />
          <button onClick={pushRoute}>Search</button>
        </div>

        <div className={styles.citiesContainer}>
          {cities && cities.map((item, index) => {
            const location = item?.location;
            const current = item?.current;

            if (current && location) {
              return (
                <div key={location.lat} className={`${styles.cityCard} animate__animated animate__fadeIn`}>
                  <Image onClick={() => removeCity(index)} src={closeIcon} className={styles.closeIcon} alt="Exclude city" width={20} height={20} />
                  <h3>{location.name}</h3>
                  {current && (
                    <>
                      <p className={styles.tempText}>{Math.round(current.temp_c)}<span>°C</span></p>
                      {current.condition.icon && (
                        <Image src={`https:${current.condition.icon}`} alt={`Weather condition in ${location.name}`} width={0} height={0} sizes="100%" style={{ width: 'auto', height: 'auto' }} />
                      )}
                      <p className={styles.condText}>{current.condition.text}</p>
                    </>
                  )}
                </div>
              );
            } else return null
          })}
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const city = query?.city;
  let responseData = null;

  if (city) {
    try {
      const externalResponse = await fetch(`${api_url}&q=${city}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await externalResponse.json();

      responseData = data.error ? { error: data.error.message } : data;

    } catch (error) {
      responseData = { error: error.message || "An unexpected error occurred" };
    }
  }

  return {
    props: {
      data: responseData,
    },
  };
}
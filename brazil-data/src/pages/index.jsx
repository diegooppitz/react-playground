import React, { useEffect } from 'react';
import styles from '@/styles/Home.module.css'
import { getOptionsData, getOptionsFilters } from '@/services'

export default function Home() {
  const [options, setOptions] = React.useState(null);
  const [optionSelected, setOptionSelected] = React.useState(null);
  const [periodFilters, setPeriodFilters] = React.useState(null);
  const [filterOption, setFilterOption] = React.useState(null);

  async function fetchOptions() {
    getOptionsData({ period: filterOption }).then(({ data }) => {
      if (!data) return;
      setOptions(data);
      setOptionSelected(data[0].id);
    })
  }

  async function fetchFilters() {
    getOptionsFilters(optionSelected).then(({ data }) => {
      if (!data) return;
      setPeriodFilters(data)
      setFilterOption(data[0].id)
    })
  }

  async function generateFile() {
    const url = `http://localhost:3000/generate-data?period=${filterOption}&id=${optionSelected}`
    // Send GET request to download the PDF
    window.open(url, '_blank');
  }

  async function changeOption(event) {
    setOptionSelected(event.target.value);
  }

  async function changeFilterOption(event) {
    setFilterOption(event.target.value);
  }

  useEffect(() => {
    if (optionSelected) fetchFilters();
  }, [optionSelected])

  useEffect(() => {
    fetchOptions();
  }, [])

  return (
    <>
      {options && periodFilters && (
        <div className={styles.container}>
          <h1 className={styles.title}>Generate Brazil Data</h1>
          <div className={styles.form}>
            <select onChange={changeOption}>
              {(options.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              )))}
            </select>
            <select onChange={changeFilterOption}>
              {(periodFilters.map((item) => (
                <option key={item.id} value={item.id}>{item.id}</option>
              )))}
            </select>
            <button onClick={generateFile}>Generate Data</button>
          </div>
        </div>
      )}
    </>
  )
}

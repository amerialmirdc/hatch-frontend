const dataset = [
    {
      ph: 8.11,
      dox: 2.73,
      temp: 31.15,
      sal: 28.79,
      timestamp: '12:06AM',
    },
    {
        ph: 8.08,
        dox: 2.81,
        temp: 31.09,
        sal: 28.95,
        timestamp: '01:07AM',
    },
    {
        ph: 8.06,
        dox: 2.8,
        temp: 30.89,
        sal: 29.09,
        timestamp: '02:08AM',
    },
    {
        ph: 8.04,
        dox: 2.9,
        temp: 30.85,
        sal: 29.2,
        timestamp: '03:09AM',
    },
    {
        ph: 8.02,
        dox: 2.76,
        temp: 30.75,
        sal: 29.3,
        timestamp: '04:10AM',
      },
      {
          ph: 8.01,
          dox: 2.65,
          temp: 30.56,
          sal: 29.39,
          timestamp: '05:11AM',
      },
      {
          ph: 7.99,
          dox: 2.66,
          temp: 30.5,
          sal: 29.47,
          timestamp: '06:12AM',
      },
      {
          ph: 7.99,
          dox: 2.98,
          temp: 30.43,
          sal: 29.58,
          timestamp: '07:13AM',
      },
      {
        ph: 8.01,
        dox: 3.32,
        temp: 30.44,
        sal: 29.8,
        timestamp: '08:14AM',
      },
      {
          ph: 8.06,
          dox: 3.74,
          temp: 30.77,
          sal: 20.59,
          timestamp: '09:15AM',
      },
      {
          ph: 8.06,
          dox: 8.07,
          temp: 30.96,
          sal: 21.53,
          timestamp: '10:00AM',
      },
  ];

  const translations = {
    ph: 'pH',
    dox: 'Dissolved Oxygen',
    temp: 'Temperature',
    sal: 'Salinity'
  }

  function addLabels(series) {
    return series.map((item) => ({
      ...item,
      label: translations[item.dataKey],
      valueFormatter: (val) => {
        if(item.dataKey === 'ph') return val
        if(item.dataKey === 'dox') return `${val} mg/L`
        if(item.dataKey === 'temp') return `${val} ºC`
        if(item.dataKey === 'sal') return `${val} ppt`
      }
    }));
  }

  export {
    dataset,
    addLabels
  }
  
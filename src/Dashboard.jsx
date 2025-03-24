import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { addLabels } from './dataset/weather';
import {
  MainContainer,
  DashboardLayout,
  LandscapeLineChart,
  FloatingMenuIcon,
  LineGraph,
  PhGauge,
  SalGauge,
  DoxGauge,
  TempGauge,
  PhTitle,
  SalTitle,
  DoxTitle,
  TempTitle,
  // Pagination,
} from './styles/app';
import axios from 'axios'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import GaugeComponent from 'react-gauge-component';
import moment from 'moment'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Pagination from '@mui/material/Pagination';


let deviceWidth = window.innerWidth
let deviceHeight = window.innerHeight
console.log("window width", window.innerWidth)
console.log("window height", window.innerHeight)

let lineChartWidth = 0
let lineChartHeight = 0
let ratio = deviceHeight/deviceWidth;

if(deviceWidth > 1200){
  lineChartWidth = (deviceWidth-(deviceWidth * 0.2))
  lineChartHeight = deviceHeight/2
}else if(deviceWidth > 700){
  lineChartWidth = (deviceWidth-(deviceWidth * 0.1))
  lineChartHeight = deviceHeight/2.5
}else{
  lineChartWidth = 320
  lineChartHeight = 280
}


const chartSetting = {
  yAxis: [
    {
      label: '',
    },
  ],
  width: lineChartWidth,
  // width: (deviceWidth - (deviceWidth/4)),
  height: lineChartHeight,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

let chartSettingForLandscape = {
  yAxis: [
    {
      label: '',
    },
  ],
  width: (deviceHeight-90),
  // width: (deviceWidth - (deviceWidth/4)),
  height: deviceWidth,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',

    },
  },
};

window.onresize = function() {
  deviceWidth = window.innerWidth
  deviceHeight = window.innerHeight
  ratio = deviceHeight/deviceWidth;
  console.log(ratio)

  chartSettingForLandscape = {
    yAxis: [
      {
        label: '',
      },
    ],
    width: (deviceHeight-90),
    // width: (deviceWidth - (deviceWidth/4)),
    height: deviceWidth,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
  
      },
    },
  };
};




function Dashboard() {
  const [curReadings, setCurReadings] = useState([])
  const [rotateStatus, setRotateStatus] = useState(false)
  const [hideGauges, setHideGauges] = useState(false)
  const [dissolvedOxygen, setDissolvedOxygen] = useState(0)
  const [temperature, setTemperature] = useState(0)
  const [salinity, setSalinity] = useState(0)
  const [ph, setpH] = useState(0)
  const [dissolvedOxygen_d, setDissolvedOxygen_d] = useState(0)
  const [temperature_d, setTemperature_d] = useState(0)
  const [salinity_d, setSalinity_d] = useState(0)
  const [ph_d, setPh_d] = useState(0)
  const [sensorReaings_latest, setSensorReadings_latest] = useState([])
  const [paginationLimit, setPaginationLimit] = useState(12)
  const [paginationOffset, setPaginationOffset] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(0)


  useEffect(() => {
    const config = {
      headers: {
          "Authorization": "Bearer ac7e0602ef932054c46724a7cba463ee0cfc3f39294b6242545399bcd6396e59fa62a455d483f2859b8a179fd5cac85ccc0978e0a7dd5a237035dca0b3ab5b3937a4eb7cf14cb9ea92d34c35e019801ed3dcaf2f405c93d5a3ed26c819e37eae07bbe054d1c186566017eada21f14b6a533d528769c8c26ef3f89aae75634529"
      }
    }

    // fetch latest sensor reading
    const fetchData = async () => {
      try { 
        // const {data: response} = await axios.get('https://hatch-middleman.netlify.app/api/hatch-get-latest-readings', config);
        const {data: response} = await axios.get('https://ras-backend.ap.ngrok.io/api/hatch-readings?sort[0]=createdAt%3Adesc&pagination[limit]=1', config);
        console.log(response)
        setCurReadings(response.data[0])
        setDissolvedOxygen(response.data[0]?.attributes?.dox || 0);
        setSalinity(response.data[0]?.attributes?.sal || 0);
        setTemperature(response.data[0]?.attributes?.rtd || 0);
        setpH(response.data[0]?.attributes?.ph || 0)
        setCurReadings(response.data[0])
        setDissolvedOxygen_d(moment(`${response.data[0]?.attributes?.createdAt}`).add(5, 'minutes').format('llll') || '-');
        setSalinity_d(moment(`${response.data[0]?.attributes?.createdAt}`).add(5, 'minutes').format('llll') || '-');
        setTemperature_d(moment(`${response.data[0]?.attributes?.createdAt}`).add(5, 'minutes').format('llll') || '-');
        setPh_d(moment(`${response.data[0]?.attributes?.createdAt}`).add(5, 'minutes').format('llll') || '-');
        
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();

    //fetch latest 12
    const fetchData2 = async () => {
      try { 
        const {data: response} = await axios.get(`https://ras-backend.ap.ngrok.io/api/hatch-readings?sort[0]=createdAt%3Adesc&filters[createdAt][$gte]=2025-03-12T00:00:00Z&filters[createdAt][$lt]=2025-03-13T00:00:00Z&pagination[start]=${paginationLimit*paginationOffset}&pagination[limit]=${paginationLimit}`, config);
        console.log('latest 12', response)
        let formattedData = []
        if(response.data){
          response.data.forEach((i)=>{
            formattedData.push({
              ph: i?.attributes?.ph,
              dox: i?.attributes?.dox,
              sal: i?.attributes?.sal,
              temp: i?.attributes?.rtd,
              timestamp: moment(`${i?.attributes?.createdAt}`).add(5, 'minutes').format('LT'),
            })
          })

          console.log('formatted data', formattedData)
          setSensorReadings_latest(formattedData);
          fetchData();
        }
        
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData2();

    let fetchDataOnInterval = setInterval(async ()=>{
        fetchData2();
        fetchData();
    }, 30000);

    return () => {
      clearInterval(fetchDataOnInterval);
      console.log("cleaned up");
    };
  }, []);


  const toggleMenu = () => {
    setRotateStatus(true)
    setHideGauges(!hideGauges)
    setTimeout(()=>{
      setRotateStatus(false)
    }, 1000) 
  }

  useEffect(() => {
    const config = {
      headers: {
          "Authorization": "Bearer ac7e0602ef932054c46724a7cba463ee0cfc3f39294b6242545399bcd6396e59fa62a455d483f2859b8a179fd5cac85ccc0978e0a7dd5a237035dca0b3ab5b3937a4eb7cf14cb9ea92d34c35e019801ed3dcaf2f405c93d5a3ed26c819e37eae07bbe054d1c186566017eada21f14b6a533d528769c8c26ef3f89aae75634529"
      }
    }
  
    // fetch latest sensor reading
    const fetchData = async () => {
      try { 
        const {data: response} = await axios.get('https://ras-backend.ap.ngrok.io/api/hatch-readings?pagination[start]=0&pagination[limit]=10000', config);
        console.log('response', response)
        
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  
    
  
    return () => {
      console.log("cleaned up");
    };
  }, []);
  
    // Download PDF
  const downloadReportInPDF = async () => {
    const config = {
      headers: {
          "Authorization": "Bearer ac7e0602ef932054c46724a7cba463ee0cfc3f39294b6242545399bcd6396e59fa62a455d483f2859b8a179fd5cac85ccc0978e0a7dd5a237035dca0b3ab5b3937a4eb7cf14cb9ea92d34c35e019801ed3dcaf2f405c93d5a3ed26c819e37eae07bbe054d1c186566017eada21f14b6a533d528769c8c26ef3f89aae75634529"
      }
    }
    const fetchData = async () => {
      try { 
        const {data: response} = await axios.get('https://ras-backend.ap.ngrok.io/api/hatch-readings?sort[0]=createdAt:asc&pagination[start]=0&pagination[limit]=10000', config);
        console.log('response', response)
        const doc = new jsPDF();
        const body = [];
        response.data?.forEach((i) => {
          body.push([
            `${i.id}`,
            `${i.attributes.dox} mg/L`,
            `${i.attributes.sal} ppt`,
            `${i.attributes.ph}`,
            `${i.attributes.rtd} ºC`,
            `${i.attributes.t2} ºC`,
            moment(`${i?.attributes?.createdAt}`).format('LTS'),
            moment(`${i?.attributes?.createdAt}`).format('l'),
          ]);
        });
  
        doc.text("Hatch", 14, 10);
        autoTable(doc, {
          head: [["ID", "Dissolved Oxygen", "Salinity", "pH", "Temperature", "Temperature 2", "Time", "Date"]],
          body: body,
        });
  
        doc.save(`Hatch-data-as-of-${moment().format('LL')}.pdf`);
  
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  };

  //fetch latest 12
  const refetchLineChartData = async (limit, offset) => {
    const config = {
      headers: {
          "Authorization": "Bearer ac7e0602ef932054c46724a7cba463ee0cfc3f39294b6242545399bcd6396e59fa62a455d483f2859b8a179fd5cac85ccc0978e0a7dd5a237035dca0b3ab5b3937a4eb7cf14cb9ea92d34c35e019801ed3dcaf2f405c93d5a3ed26c819e37eae07bbe054d1c186566017eada21f14b6a533d528769c8c26ef3f89aae75634529"
      }
    }
  
    try { 
      const {data: response} = await axios.get(`https://ras-backend.ap.ngrok.io/api/hatch-readings?sort[0]=createdAt%3Adesc&pagination[start]=${limit*offset}&pagination[limit]=${limit}`, config);
      console.log('latest 12', response.data)
      let formattedData = []
      if(response.data){
        response.data.forEach((i)=>{
          formattedData.push({
            ph: i?.attributes?.ph,
            dox: i?.attributes?.dox,
            sal: i?.attributes?.sal,
            temp: i?.attributes?.rtd,
            timestamp: moment(`${i?.attributes?.createdAt}`).add(5, 'minutes').format('LT'), // added 5 minutes here because the time in server is delayed 5mins
          })
        })

        console.log('formatted data', formattedData)
        setSensorReadings_latest(formattedData);
      }
      
    } catch (error) {
      console.error(error.message);
    }
  }

  const handlePaginate = (e, _page) => {
    setPage(_page)
    console.log('current page: ', _page)
  }

  


  return (
    <MainContainer>
      {/* <button onClick={prev}>prev</button>
      <span>date here</span>
      <button onClick={next}>next</button>
      <Pagination $color="blue"></Pagination> */}
      {/* <Pagination2 $text="herre"></Pagination2> */}
      <DownloadForOfflineIcon 
        onClick={downloadReportInPDF}
        style={{fontSize: '42px', color: '#AFAF9F', cursor: 'pointer', position: 'fixed', top: '15px', left: '15px'}}
      ></DownloadForOfflineIcon>
      
      <FloatingMenuIcon onClick={toggleMenu} className={`${rotateStatus?'rotate':''}`} fontSize=""></FloatingMenuIcon>
      <LandscapeLineChart className={`${!hideGauges?'hidden-content':'show-content'}`}>
        <BarChart
            dataset={sensorReaings_latest}
            xAxis={[{ scaleType: 'band', dataKey: 'timestamp' }]}
            series={addLabels([
              {dataKey: 'ph', color:'#F2AF9F'},
              {dataKey: 'dox', color:'#00B4F7'},
              {dataKey: 'sal', color:'#ABD0BF'},
              {dataKey: 'temp', color:'#EFA650'},
            ])}
            {...chartSettingForLandscape}
          />
      </LandscapeLineChart>

      <DashboardLayout className={`${hideGauges?'hidden-content':'show-content'}`}>
        <LineGraph>
          <BarChart
            dataset={sensorReaings_latest}
            xAxis={[{ scaleType: 'band', dataKey: 'timestamp' }]}
            series={addLabels([
              {dataKey: 'ph', color:'#F2AF9F'},
              {dataKey: 'dox', color:'#00B4F7'},
              {dataKey: 'sal', color:'#ABD0BF'},
              {dataKey: 'temp', color:'#EFA650'},
            ])}
            {...chartSetting}
          />
          <Pagination page={page} count={11} onChange={(e, page)=>handlePaginate(e,page)} variant="outlined" shape="rounded" style={{position:'relative', top: '-65px'}} />
        </LineGraph>
            
        <TempGauge>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 10,
                  color: '#EA4228',
                  showTick: true,
                  tooltip: {
                    text: 'Too low temperature!'
                  },
                  onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                },
                {
                  limit: 15,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low temperature!'
                  }
                },
                {
                  limit: 40,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK temperature!'
                  }
                },
                {
                  limit: 45, color: '#F5CD19', showTick: true,
                  tooltip: {
                    text: 'High temperature!'
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                    text: 'Too high temperature!'
                  }
                }
              ]
            }}
            pointer={{
              color: '#345243',
              length: 0.80,
              width: 15,
              elastic: true,
            }}
            labels={{
              valueLabel: { formatTextValue: value => value + 'ºC', style: {display:'none'} },
              tickLabels: {
                type: 'outer',
                defaultTickValueConfig: { 
                  formatTextValue: (value) => value + 'ºC' ,
                  style: {fontSize: 10}
              },
                ticks: [
                  { value: 0 },
                  { value: temperature },
                  { value: 50 }
                ],
              }
            }}
            value={temperature}
            minValue={5}
            maxValue={50}
          />
          <TempTitle>
          <h3>{temperature} ºC</h3>
          <p>Temperature</p>
          <h6>{temperature_d}</h6>
          </TempTitle>
        </TempGauge>

        <SalGauge>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 10,
                  color: '#EA4228',
                  showTick: true,
                  tooltip: {
                    text: 'Too low Salinity!'
                  },
                  onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                },
                {
                  limit: 15,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low Salinity!'
                  }
                },
                {
                  limit: 30,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK Salinity!'
                  }
                },
                {
                  limit: 35, color: '#F5CD19', showTick: true,
                  tooltip: {
                    text: 'High Salinity!'
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                    text: 'Too high Salinity!'
                  }
                }
              ]
            }}
            pointer={{
              color: '#345243',
              length: 0.80,
              width: 15,
              elastic: true,
            }}
            labels={{
              valueLabel: { formatTextValue: value => value + 'ppt', style: {display:'none'} },
              tickLabels: {
                type: 'outer',
                defaultTickValueConfig: { 
                  formatTextValue: (value) => value + 'ppt' ,
                  style: {fontSize: 10}
              },
                ticks: [
                  { value: 13 },
                  { value: salinity },
                  { value: 32 }
                ],
              }
            }}
            value={salinity}
            minValue={5}
            maxValue={40}
          />

          
          <SalTitle>
          <h3>{salinity} ppt</h3>
          <p>Salinity</p>
          <h6>{salinity_d}</h6>
          </SalTitle>
        </SalGauge>

        <DoxGauge>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 2,
                  color: '#EA4228',
                  showTick: true,
                  tooltip: {
                    text: 'Too low Dissolved Oxygen!'
                  },
                  onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                },
                {
                  limit: 3,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low Dissolved Oxygen!'
                  }
                },
                {
                  limit: 12,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK Dissolved Oxygen!'
                  }
                },
                {
                  limit: 13, color: '#F5CD19', showTick: true,
                  tooltip: {
                    text: 'High Dissolved Oxygen!'
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                    text: 'Too high Dissolved Oxygen!'
                  }
                }
              ]
            }}
            pointer={{
              color: '#345243',
              length: 0.80,
              width: 15,
              elastic: true,
            }}
            labels={{
              valueLabel: { formatTextValue: value => value + 'mg/L', 
                style: {display:'none'}
              },
              tickLabels: {
                type: 'outer',
                defaultTickValueConfig: { 
                  formatTextValue: (value) => value + 'mg/L' ,
                  style: {fontSize: 10}
              },
                ticks: [
                  { value: 0 },
                  { value: dissolvedOxygen },
                  { value: 15 }
                ],
              }
            }}
            value={dissolvedOxygen}
            minValue={0}
            maxValue={15}
          />
            
          <DoxTitle>
          <h3>{dissolvedOxygen} mg/L</h3>
          <p>Dissolved Oxygen</p>
          <h6>{dissolvedOxygen_d}</h6>
          </DoxTitle>
        </DoxGauge>

        <PhGauge>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 4,
                  color: '#EA4228',
                  showTick: true,
                  tooltip: {
                    text: 'Too low pH!'
                  },
                  onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                },
                {
                  limit: 6,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low pH!'
                  }
                },
                {
                  limit: 9,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK pH!'
                  }
                },
                {
                  limit: 11, color: '#F5CD19', showTick: true,
                  tooltip: {
                    text: 'High pH!'
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                    text: 'Too high pH!'
                  }
                }
              ]
            }}
            pointer={{
              color: '#345243',
              length: 0.80,
              width: 15,
              elastic: true,
            }}
            labels={{
              valueLabel: { formatTextValue: value => value + ' ', style: {display:'none'} },
              tickLabels: {
                type: 'outer',
                defaultTickValueConfig: { 
                  formatTextValue: (value) => value + ' ' ,
                  style: {fontSize: 10}
              },
                ticks: [
                  { value: 3 },
                  { value: ph },
                  { value: 12 }
                ],
              }
            }}
            value={ph}
            minValue={3}
            maxValue={12}
          />
          <PhTitle>
            <h3>{ph}</h3>
            <p>pH</p>
            <h6>{ph_d}</h6>
          </PhTitle>
        </PhGauge>
      </DashboardLayout>
    </MainContainer>
  );
}

export default Dashboard

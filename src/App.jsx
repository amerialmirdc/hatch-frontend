import { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset, addLabels } from './dataset/weather';
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
  TempTitle
} from './styles/app';
import axios from 'axios'

import GaugeComponent from 'react-gauge-component';


const deviceWidth = window.innerWidth
const deviceHeight = window.innerHeight
console.log("window width", window.innerWidth)
console.log("window height", window.innerHeight)

let lineChartWidth = 0
let lineChartHeight = 0

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

const chartSettingForLandscape = {
  yAxis: [
    {
      label: '',
    },
  ],
  width: deviceHeight,
  // width: (deviceWidth - (deviceWidth/4)),
  height: deviceWidth,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',

    },
  },
};




function App() {
  const [curReadings, setCurReadings] = useState([])
  const [rotateStatus, setRotateStatus] = useState(false)
  const [hideGauges, setHideGauges] = useState(false)

  useEffect(() => {

    const config = {
        headers: {
            "Authorization": "Bearer ac7e0602ef932054c46724a7cba463ee0cfc3f39294b6242545399bcd6396e59fa62a455d483f2859b8a179fd5cac85ccc0978e0a7dd5a237035dca0b3ab5b3937a4eb7cf14cb9ea92d34c35e019801ed3dcaf2f405c93d5a3ed26c819e37eae07bbe054d1c186566017eada21f14b6a533d528769c8c26ef3f89aae75634529"
        }
    }

    const fetchData = async () => {
      try {
        const {data: response} = await axios.get('https://ras-backend.ap.ngrok.io/api/hatch-readings?sort[0]=createdAt%3Adesc&pagination[limit]=1', config);
        console.log(response)
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchData();
  },[])


  const toggleMenu = () => {
    setRotateStatus(true)
    setHideGauges(!hideGauges)
    setTimeout(()=>{
      setRotateStatus(false)
    }, 1000) 
  }


  return (
    <MainContainer>

      <FloatingMenuIcon onClick={toggleMenu} className={`${rotateStatus?'rotate':''}`} fontSize=""></FloatingMenuIcon>

      <LandscapeLineChart className={`${!hideGauges?'hidden-content':'show-content'}`}>
        <BarChart
            dataset={dataset}
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
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'timestamp' }]}
            series={addLabels([
              {dataKey: 'ph', color:'#F2AF9F'},
              {dataKey: 'dox', color:'#00B4F7'},
              {dataKey: 'sal', color:'#ABD0BF'},
              {dataKey: 'temp', color:'#EFA650'},
            ])}
            {...chartSetting}
          />
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
                  limit: 15,
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
                  limit: 17,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low temperature!'
                  }
                },
                {
                  limit: 28,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK temperature!'
                  }
                },
                {
                  limit: 30, color: '#F5CD19', showTick: true,
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
                  { value: 13 },
                  { value: 22.5 },
                  { value: 32 }
                ],
              }
            }}
            value={22.5}
            minValue={10}
            maxValue={35}
          />
          <TempTitle>
          <h3>22.5 ºC</h3>
          <p>Temperature</p>
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
                  limit: 15,
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
                  limit: 17,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low Salinity!'
                  }
                },
                {
                  limit: 28,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK Salinity!'
                  }
                },
                {
                  limit: 30, color: '#F5CD19', showTick: true,
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
                  { value: 21.53 },
                  { value: 32 }
                ],
              }
            }}
            value={21.53}
            minValue={10}
            maxValue={35}
          />

          
          <SalTitle>
          <h3>21.53 ppt</h3>
          <p>Salinity</p>
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
                  limit: 4,
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
                  limit: 7,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low Dissolved Oxygen!'
                  }
                },
                {
                  limit: 20,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK Dissolved Oxygen!'
                  }
                },
                {
                  limit: 24, color: '#F5CD19', showTick: true,
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
                  { value: 13 },
                  { value: 8.07 },
                  { value: 32 }
                ],
              }
            }}
            value={8.07}
            minValue={0}
            maxValue={30}
          />
            
          <DoxTitle>
          <h3>8.07 mg/L</h3>
          <p>Dissolved Oxygen</p>
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
                  limit: 3,
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
                  limit: 6.9,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low pH!'
                  }
                },
                {
                  limit: 9.9,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK pH!'
                  }
                },
                {
                  limit: 12, color: '#F5CD19', showTick: true,
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
                  { value: 0 },
                  { value: 8.06 },
                  { value: 15 }
                ],
              }
            }}
            value={8.06}
            minValue={0}
            maxValue={15}
          />
          <PhTitle>
            <h3>8.06</h3>
            <p>pH</p>
          </PhTitle>
        </PhGauge>
      </DashboardLayout>
    </MainContainer>
  );
}

export default App

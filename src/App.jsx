// import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset, valueFormatter } from './dataset/weather';
import {
  MainContainer,
  GaugeChartContainer, 
  DashboardLayout,
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

import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

import GaugeComponent from 'react-gauge-component';

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="#575757" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="#575757"
        strokeWidth={3}
      />
    </g>
  );
}


const chartSetting = {
  yAxis: [
    {
      label: '',
    },
  ],
  width: 1200,
  height: 350,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};


function App() {

  return (
    <MainContainer>
      
      <DashboardLayout>
        <LineGraph>
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: 'band', dataKey: 'timestamp' }]}
            series={[
              { dataKey: 'ph', label: 'pH', valueFormatter, color:'#F2AF9F', },
              { dataKey: 'dox', label: 'Dissolved Oxygen', valueFormatter, color:'#00B4F7', },
              { dataKey: 'sal', label: 'Salinity', valueFormatter, color:'#ABD0BF', },
              { dataKey: 'temp', label: 'Temperature', valueFormatter, color:'#EFA650', },
            ]}
            {...chartSetting}
          />
        </LineGraph>

        <TempGauge>
          {/* <GaugeChartContainer >
            <GaugeContainer
              width={220}
              height={220}
              startAngle={-110}
              endAngle={110}
              value={30}
              valueMax={50}
              valueMin={0}
              color="red"
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugePointer />
            </GaugeContainer>
          </GaugeChartContainer> */}
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
          {/* <GaugeChartContainer>
            <GaugeContainer
              width={220}
              height={220}
              startAngle={-110}
              endAngle={110}
              value={30}
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugePointer />
            </GaugeContainer>
          </GaugeChartContainer> */}
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
          {/* <GaugeChartContainer>
            <GaugeContainer
              width={220}
              height={220}
              startAngle={-110}
              endAngle={110}
              value={30}
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugePointer />
            </GaugeContainer>
          </GaugeChartContainer> */}

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
                    text: 'Too low Dissolved Oxygen!'
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
                    text: 'Low Dissolved Oxygen!'
                  }
                },
                {
                  limit: 28,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK Dissolved Oxygen!'
                  }
                },
                {
                  limit: 30, color: '#F5CD19', showTick: true,
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
          {/* <GaugeChartContainer>
            <GaugeContainer
              width={220}
              height={220}
              startAngle={-110}
              endAngle={110}
              value={30}
            >
              <GaugeReferenceArc />
              <GaugeValueArc />
              <GaugePointer />
            </GaugeContainer>
          </GaugeChartContainer> */}
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 1,
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
                  limit: 7,
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
                  limit: 10, color: '#F5CD19', showTick: true,
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

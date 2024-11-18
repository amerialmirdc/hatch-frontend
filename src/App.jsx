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
  gaugeClasses
} from '@mui/x-charts/Gauge';

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
              { dataKey: 'ph', label: 'pH', valueFormatter, color:'#d84527', },
              { dataKey: 'dox', label: 'Dissolved Oxygen', valueFormatter, color:'#ece513', },
              { dataKey: 'sal', label: 'Salinity', valueFormatter, color:'#54ab66', },
              { dataKey: 'temp', label: 'Temperature', valueFormatter, color:'#484848', },
            ]}
            {...chartSetting}
          />
        </LineGraph>

        <TempGauge>
          <GaugeChartContainer >
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
          </GaugeChartContainer>
          <TempTitle>Temp</TempTitle>
        </TempGauge>

        <SalGauge>
          <GaugeChartContainer>
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
          </GaugeChartContainer>
          <SalTitle>Sal</SalTitle>
        </SalGauge>

        <DoxGauge>
          <GaugeChartContainer>
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
          </GaugeChartContainer>
          <DoxTitle>Dox</DoxTitle>
        </DoxGauge>

        <PhGauge>
          <GaugeChartContainer>
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
          </GaugeChartContainer>
          <PhTitle>pH</PhTitle>
        </PhGauge>
      </DashboardLayout>
    </MainContainer>
  );
}

export default App

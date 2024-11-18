import styled from "styled-components"

const MainContainer = styled.div`
    max-width: 1200px;
    margin: auto;
`

const GaugeChartContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
    top: -70px;
`

const DashboardLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        "line-graph line-graph line-graph line-graph"
        "ph-gauge sal-gauge dox-gauge temp-gauge";
    height: 100vh;
`

const LineGraph = styled.div`
    grid-area: line-graph;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const PhGauge = styled.div`
    grid-area: ph-gauge;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4px;
`
const SalGauge = styled.div`
    grid-area: sal-gauge;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4px;
`
const DoxGauge = styled.div`
    grid-area: dox-gauge;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4px;
`
const TempGauge = styled.div`
    grid-area: temp-gauge;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4px;
`
const PhTitle = styled.div`
    font-size: 18px;
    color: #696969;
    font-family: Arial;
    & h3 {
        text-align: center;
        font-size: 24px;
        margin: 0;
    }
    & p {
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: monospace;
        color: #616161cc;
        margin-top: 6px;
        text-align: center;
    }
`
const SalTitle = styled.div`
    font-size: 18px;
    color: #696969;
    font-family: Arial;
    & h3 {
        text-align: center;
        font-size: 24px;
        margin: 0;
    }
    & p {
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: monospace;
        color: #616161cc;
        margin-top: 6px;
        text-align: center;
    }
`
const DoxTitle = styled.div`
    font-size: 18px;
    color: #696969;
    font-family: Arial;
    & h3 {
        text-align: center;
        font-size: 24px;
        margin: 0;
    }
    & p {
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: monospace;
        color: #616161cc;
        margin-top: 6px;
        text-align: center;
    }
`
const TempTitle = styled.div`
    font-size: 18px;
    color: #696969;
    font-family: Arial;
    & h3 {
        text-align: center;
        font-size: 24px;
        margin: 0;
    }
    & p {
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: monospace;
        color: #616161cc;
        margin-top: 6px;
        text-align: center;
    }
`

export {
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
};
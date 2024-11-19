import styled from "styled-components"

// console.log("window width", window.innerWidth)
// const deviceWidth = window.innerWidth

const MainContainer = styled.div`
    max-width: 1200px;
    margin: auto;

    @media screen and (min-width: 300px) {
        max-width: 100%;
        margin: 0;
    }
    @media screen and (min-width: 1000px) {
        max-width: 1200px;
        margin: auto;
    }
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

    @media screen and (min-width: 300px) {
        grid-template-columns: 1fr;
        grid-template-areas:
        "line-graph"
        "ph-gauge"
        "sal-gauge"
        "dox-gauge"
        "temp-gauge";
    }
    @media screen and (min-width: 700px) {
        grid-template-columns: 1fr 1fr;
        grid-template-areas:
        "line-graph line-graph"
        "ph-gauge sal-gauge"
        "dox-gauge temp-gauge";
    }
    @media screen and (min-width: 1400px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-areas:
        "line-graph line-graph line-graph line-graph"
        "ph-gauge sal-gauge dox-gauge temp-gauge";
    }
`

const LineGraph = styled.div`
    grid-area: line-graph;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    @media screen and (min-width: 300px) {
        display: none;
    }
    @media screen and (min-width: 600px) {
        display: flex;
    }
`
const PhGauge = styled.div`
    grid-area: ph-gauge;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4px;
    
    
    @media screen and (min-width: 300px) {
        padding-top: 32px;
        padding-bottom: 32px;
    }
    @media screen and (min-width: 700px) {
        padding-bottom: 0px;
        padding-top: 0px;
        align-self: center;
    }
    @media screen and (min-width: 1000px) {
        padding-top: 4px;
        padding-bottom: 4px;
    }
`
const SalGauge = styled.div`
    grid-area: sal-gauge;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4px;
    
    
    @media screen and (min-width: 300px) {
        padding-top: 32px;
        padding-bottom: 32px;
    }
    @media screen and (min-width: 700px) {
        padding-bottom: 0px;
        padding-top: 0px;
        align-self: center;
    }
    @media screen and (min-width: 1000px) {
        padding-top: 4px;
        padding-bottom: 4px;
    }
`
const DoxGauge = styled.div`
    grid-area: dox-gauge;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4px;
    
    
    @media screen and (min-width: 300px) {
        padding-top: 32px;
        padding-bottom: 32px;
    }
    @media screen and (min-width: 700px) {
        padding-bottom: 0px;
        padding-top: 0px;
        align-self: center;
    }
    @media screen and (min-width: 1000px) {
        padding-top: 4px;
        padding-bottom: 4px;
    }
`
const TempGauge = styled.div`
    grid-area: temp-gauge;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 4px;
    
    
    @media screen and (min-width: 300px) {
        padding-top: 32px;
        padding-bottom: 32px;
    }
    @media screen and (min-width: 700px) {
        padding-bottom: 0px;
        padding-top: 0px;
        align-self: center;
    }
    @media screen and (min-width: 1000px) {
        padding-top: 4px;
        padding-bottom: 4px;
    }
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
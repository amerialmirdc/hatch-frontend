// import React from 'react'
import { useEffect } from "react";
import axios from 'axios'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import moment from 'moment';

const DownloadPDF = () => {

  useEffect(() => {
    const config = {
      headers: {
          "Authorization": "Bearer ac7e0602ef932054c46724a7cba463ee0cfc3f39294b6242545399bcd6396e59fa62a455d483f2859b8a179fd5cac85ccc0978e0a7dd5a237035dca0b3ab5b3937a4eb7cf14cb9ea92d34c35e019801ed3dcaf2f405c93d5a3ed26c819e37eae07bbe054d1c186566017eada21f14b6a533d528769c8c26ef3f89aae75634529"
      }
    }

    // fetch latest sensor reading
    const fetchData = async () => {
      try { 
        const {data: response} = await axios.get('https://ras-backend.ap.ngrok.io/api/hatch-readings?pagination[start]=0&pagination[limit]=100', config);
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
      const {data: response} = await axios.get('https://ras-backend.ap.ngrok.io/api/hatch-readings?pagination[start]=0`&pagination[limit]=400', config);
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
          moment(`${i?.attributes?.createdAt}`).format('LTS'),
          moment(`${i?.attributes?.createdAt}`).format('l'),
        ]);
      });

      doc.text("Hatch", 14, 10);
      autoTable(doc, {
        head: [["ID", "Dissolved Oxygen", "Salinity", "pH", "Temperature", "Time", "Date"]],
        body: body,
      });

      doc.save("Hatch-Page-1.pdf");

    } catch (error) {
      console.error(error.message);
    }
  }
  fetchData();
  // await getPHLevels_pnd6(date__from.value, date__to.value, 50000, 0, sort.value)
  //   .then((res) => {
  //     console.log("Reports Data", res.data.data);
  //     fullpageLoaderState.value = !fullpageLoaderState.value;
  //     const doc = new jsPDF();
  //     const body = [];
  //     res.data.data?.forEach((i) => {
  //       body.push([
  //         `${i.attributes.dox} mg/L`,
  //         displayTimeOnly(i.attributes.createdAt),
  //         displayDateOnly(i.attributes.createdAt),
  //       ]);
  //     });

  //     doc.text("Pond 1", 14, 10);
  //     autoTable(doc, {
  //       head: [["Dissolved Oxygen", "Time", "Date"]],
  //       body: body,
  //     });

  //     doc.save("pond-1(Dissolved Oxygen).pdf");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

  return (
    <div>
      <button onClick={downloadReportInPDF}>DOWNLOAD PDF</button>
    </div>
  )
}

export default DownloadPDF
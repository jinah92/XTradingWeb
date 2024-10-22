import React, { useEffect, useState } from "react";
import { useUpbitMarket, ItemData } from "@/hooks/upbit/UpbitApi";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { Button } from "../ui/button";


const CodeList = () => {
const { upbitMarketApi, dataList } = useUpbitMarket();
  const [codeType, setCodeType] = useState("");
  const [rowData, setRowData] = useState<ItemData[]>([]);
  
  // Column Definitions: Defines the columns to be displayed.
  const colDefs = [
    { field: "image" },
    { field: "market" },
    { field: "english_name" },
  ];

  useEffect(() => {
    setRowData(dataList?.KRW ?? []);
  }, [dataList]);

  useEffect(() => {
    upbitMarketApi();
  }, [])

  useEffect(() => {
    if(codeType === 'KRW') {
      setRowData(dataList?.KRW ?? []);
    }
    else if(codeType === 'BTC') {
      setRowData(dataList?.BTC ?? []);
    }
    else if(codeType === 'USDT') {
      setRowData(dataList?.USDT ?? []);
    }
  }, [codeType])

  return (
    <div className="flex w-full flex-col justify-center space-y-6">
        <div className="flex w-full justify-around">
          <Button className="w-3/12" onClick={()=>setCodeType("KRW")}>KRW</Button>
          <Button className="w-3/12" onClick={()=>setCodeType("BTC")}>BTC</Button>
          <Button className="w-3/12" onClick={()=>setCodeType("USDT")}>USDT</Button>
        </div>
        <div
            className="ag-theme-quartz" // applying the Data Grid theme
            style={{ height: 500 }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    </div>
  );
};

export default CodeList;

import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";

const GoldChart = () => {
  const containerRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "OANDA:XAUUSD", // 🔥 GOLD
      interval: "1",
      timezone: "Asia/Dubai",
      theme: "dark",
      style: "1",
      locale: "en",
      enable_publishing: false,
      hide_top_toolbar: true,
      hide_legend: false,
      save_image: false,
      backgroundColor: "rgba(0,0,0,0)",
      gridColor: "rgba(255,255,255,0.05)",
    });

    containerRef.current.appendChild(script);
  }, []);

  return (
    <Box
    
      sx={{
        width: "100%",
        height: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow:'1px 1px  15px #172540',

      }}
    >
      <div
        className="tradingview-widget-container"
        style={{ height: "100%", width: "100%" }}
        ref={containerRef}
      />
    </Box>
  );
};

export default GoldChart;

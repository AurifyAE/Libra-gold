import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const SystemClock = () => {
  const [timeData, setTimeData] = useState({
    day: "",
    date: "",
    time: "",
  });


  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const dayStr = now
        .toLocaleDateString("en-GB", { weekday: "long" })
        .toUpperCase();

      const dateStr = now
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
        .toUpperCase();

      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      setTimeData({
        day: dayStr,
        date: dateStr,
        time: timeStr,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: 'column'

      }}
    >


      <Typography
        sx={{
          fontSize: {
            xs: "14px",
            sm: "2.5vw",
          },
          fontWeight: 800,
          color: "#A08038",
          letterSpacing: "2px",
          lineHeight: "1.2",
        }}
      >
        {timeData.time}
      </Typography>

      {/* Date */}
      <Typography
        sx={{
          fontSize: {
            xs: "12px",
            sm: "1vw",
          },
          fontWeight: 700,
          letterSpacing: "2px",
          color: "#A08038",
        }}
      >
        {timeData.date || "-- --- ----"}
      </Typography>
      {/* Day */}
      <Typography
        sx={{
          fontSize: {
            xs: "12px",
            sm: "1.4vw",
          },
          fontWeight: 500,
          color: "#A08038",
          letterSpacing: "2px",
        }}
      >
        {timeData.day || "-----"}
      </Typography>




    </Box>
  );
};

export default SystemClock;

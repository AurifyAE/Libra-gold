import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const clockConfig = [
  {
    key: "ksa",
    label: "KSA",
    timeZone: "Asia/Riyadh",
    flag: "/images/ksa.png",
  },
  {
    key: "usa",
    label: "USA",
    timeZone: "America/New_York", // or change if needed
    flag: "/images/usa.png",
  },
  {
    key: "ndjamena",
    label: "N.DJAMENA",
    timeZone: "Africa/Ndjamena", // ✅ correct timezone
    flag: "/images/chad.png",
  },
  {
    key: "uk",
    label: "UK",
    timeZone: "Europe/London",
    flag: "/images/uk.png",
  },
];


const WorldClockHorizontal = () => {
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const updatedTimes = {};

      clockConfig.forEach((clock) => {
        const localTime = new Date(
          now.toLocaleString("en-US", { timeZone: clock.timeZone })
        );
        updatedTimes[clock.key] = localTime;
      });

      setTimes(updatedTimes);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Analog Clock Component inside same file
  const AnalogClock = ({ date }) => {
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();

    const secondDeg = seconds * 6;
    const minuteDeg = minutes * 6 + seconds * 0.1;
    const hourDeg = hours * 30 + minutes * 0.5;

    return (
      <svg width="80" height="80" viewBox="0 0 100 100">
        {/* Outer Circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          // stroke="#d4af37"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Ticks */}
        {[...Array(60)].map((_, i) => {
          const angle = i * 6;
          const isHour = i % 5 === 0;
          const length = isHour ? 6 : 3;

          return (
            <line
              key={i}
              x1="50"
              y1="5"
              x2="50"
              y2={5 + length}
              stroke="#d4af37"
              strokeWidth={isHour ? 1.5 : 0.5}
              transform={`rotate(${angle} 50 50)`}
            />
          );
        })}

        {/* Hour Hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="30"
          stroke="#d4af37"
          strokeWidth="2"
          transform={`rotate(${hourDeg} 50 50)`}
        />

        {/* Minute Hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke="#d4af37"
          strokeWidth="1.5"
          transform={`rotate(${minuteDeg} 50 50)`}
        />

        {/* Second Hand */}
        {/* <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke="#d4af37"
          strokeWidth="1"
          transform={`rotate(${secondDeg} 50 50)`}
        /> */}

        {/* Center Dot */}
        <circle cx="50" cy="50" r="2" fill="#d4af37" />
      </svg>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        padding: "1vw 0",
        border: "0.1vw solid #ffffff4a",
        borderRadius: "1vw",
        backdropFilter: "blur(0.2vw)",
        background: "#f7e4d300",
      }}
    >
      {clockConfig.map((clock) => (
        <Box
          key={clock.key}
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* FLAG */}
          <Box sx={{ width: { xs: "30px", lg: "3vw" }, height: 'auto', aspectRatio: '4/2' }}>
            <img
              src={clock.flag}
              alt={clock.label}
              style={{ width: "100%" }}
            />
          </Box>
        

          {/* LABEL */}
          <Typography sx={{ color: "#fff", fontWeight: 500 }}>
            {clock.label}
          </Typography>

          {/* DIGITAL TIME */}
          <Typography sx={{ color: "#fff" }}>
            {times[clock.key]
              ? times[clock.key].toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
              : "--:--"}
          </Typography>

          {/* ANALOG CLOCK */}
          {times[clock.key] && (
            <Box sx={{ filter: "drop-shadow(0 0 6px #d4af37)" }}>
              <AnalogClock date={times[clock.key]} />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default WorldClockHorizontal;

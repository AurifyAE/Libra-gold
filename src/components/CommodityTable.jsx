import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

const OUNCE = 31.103;
const AED = 3.674;


const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const CommodityTable = ({ title, items }) => {
  const { goldData, silverData } = useSpotRate();

  // ✅ FIXED: Minted bars treated as gold
  const getSpot = (metal) => {
    const lower = metal?.toLowerCase() || "";

    if (lower.includes("gold") || lower.includes("minted")) {
      return goldData; // ✅ minted uses gold spot
    }

    if (lower.includes("silver")) return silverData;

    return null;
  };

  const toNumber = (value) => {
    if (value == null) return 0;
    if (typeof value === "number") return Number.isFinite(value) ? value : 0;
    const raw = String(value).trim();
    if (!raw) return 0;
    const cleaned = raw.replace(/,/g, "");
    const n = parseFloat(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  const purityFactor = (purity) =>
    purity ? purity / 10 ** String(purity).length : 1;

  const formatPrice = (value) => {
    if (value == null || isNaN(value)) return "—";

    const intLen = Math.floor(Math.abs(value)).toString().length;

    let decimals = 3;
    if (intLen >= 4) decimals = 0;
    else if (intLen === 3) decimals = 2;

    return value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const rows =
    items
      ?.map((item) => {
        const spot = getSpot(item.metal);
        if (!spot) return null;

        const multiplier = UNIT_MULTIPLIER[item.weight] || 1;
        const purity = purityFactor(item.purity);
        const unitValue = toNumber(item.unit) || 1;

        const spotBid = toNumber(spot.bid);
        const spotAsk = toNumber(spot.ask);

        const buyPremium = toNumber(item.buyPremium);
        const sellPremium = toNumber(item.sellPremium);

        // Premiums are applied at spot-level (USD/oz), then converted to AED
        const baseBid =
          ((spotBid + buyPremium) / OUNCE) * AED * multiplier * unitValue * purity;
        const baseAsk =
          ((spotAsk + sellPremium) / OUNCE) * AED * multiplier * unitValue * purity;

        const bid = baseBid + toNumber(item.buyCharge);
        const ask = baseAsk + toNumber(item.sellCharge);

        const isTenTola = item.metal === "Gold Ten TOLA";

        return {
          name: isTenTola ? "Gold" : item.metal,
          purity: isTenTola ? "TEN TOLA" : item.purity,
          unit: `${unitValue} ${item.weight}`,
          bid,
          ask,
        };
      })
      .filter(Boolean) ?? [];

  const [screenSize, setScreenSize] = useState("desktop");

  useEffect(() => {
    const checkWidth = () => {
      const width = window.innerWidth;

      if (width < 700) {
        setScreenSize("mobile");
      } else if (width < 900) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  const swiperConfig = {
    mobile: {
      slidesPerView: 4,
      spaceBetween: 5,
      height: "200px",
      speed: 2500,
    },
    tablet: {
      slidesPerView: 5,
      spaceBetween: 8,
      height: "320px",
      speed: 3000,
    },
    desktop: {
      slidesPerView: 4,
      spaceBetween: 10,
      height: "19vw",
      speed: 3500,
    },
  };

  const current = swiperConfig[screenSize];

  // ❌ No data → don't render section
  if (!rows.length) return null;

  return (
    <Box sx={{ width: "100%", overflow: "hidden" }}>


      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
          py: { xs: '10px', sm: "0.5vw" },
          px: "1.5vw",
          borderRadius: "0.5vw",
          alignItems: "end",
          borderRadius: "0.8vw",
          backdropFilter: "blur(0.3vw)",
          border: "0.1vw solid #DDFDFF59",
          background: "#A08038",
        }}
      >
        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.5vw",
            },
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: "0.04vw",
            textAlign: "start",
          }}
        >
          COMMODITY
        </Typography>

        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.5vw",
            },
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "start",
          }}
        >
          UNIT
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.5vw",
            },
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          BID

        </Typography>

        <Typography
          sx={{
            // fontSize: "1.2vw",
            fontSize: {
              xs: "14px",
              lg: "1.2vw",
              xl: "1.5vw",
            },
            fontWeight: 600,
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          ASK

        </Typography>
      </Box>

      <Box
        sx={{
          maxHeight: { xs: current.height },
          mt: "1vw",
        }}
      >
        {rows.length === 0 ? (
          <Typography
            sx={{
              py: "3vw",
              textAlign: "center",
              color: "rgba(227,192,120,0.4)",
              fontSize: "1.25vw",
            }}
          >
            No data available
          </Typography>
        ) : (
          <Swiper
            direction="vertical"
            slidesPerView={current.slidesPerView}
            spaceBetween={current.spaceBetween}
            loop
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={current.speed}
            style={{ height: current.height }}
          >
            {rows.map((row, index) => (
              <SwiperSlide key={index}>
                <Box
                  key={index}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 0.8fr 0.8fr 0.8fr",
                    alignItems: "center",
                    borderRadius: ".5vw",
                    py: ".5vw",
                    height: "100%",
                    px: "1.5vw",
                    border: "1px solid rgba(255, 255, 255, 0.3)", // 👈 mild bg
                  }}
                >
                  <Typography
                    sx={{
                      // fontSize: "1.24vw",
                      fontSize: {
                        xs: "14px",
                        sm: "12px",
                        lg: "1.6vw",
                        xl: "1.5vw",
                      },
                      fontWeight: 800,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center ",
                      justifyContent: "start",
                      gap: {
                        xs: "7px",
                        lg: "0.3vw",
                      },
                    }}
                  >
                    {row.name}
                    <Typography
                      sx={{
                        // fontSize: "1vw",
                        fontSize: {
                          xs: "12px",
                          sm: "10px",
                          lg: "1.2vw",
                        },
                        fontWeight: 400,
                        color: "#FFFFFF",
                        // mb:'-0.5vw'
                      }}
                    >
                      {row.purity}
                    </Typography>
                  </Typography>

                  <Typography
                    sx={{
                      // fontSize: "1.18vw",
                      fontSize: {
                        xs: "14px",
                        lg: "1.3vw",
                        xl: "1.5vw",
                      },
                      color: "#FFFFFF",
                      textAlign: "start",
                    }}
                  >
                    {row.unit}
                  </Typography>

                  <Typography
                    sx={{
                      // fontSize: "1.32vw",
                      fontSize: {
                        xs: "14px",
                        lg: "1.5vw",
                        xl: "1.5vw",
                      },
                      fontWeight: 600,
                      color: "#FFFFFF", // soft pink ASK
                    }}
                  >
                    {formatPrice(row.bid)}
                  </Typography>

                  <Typography
                    sx={{
                      // fontSize: "1.32vw",
                      fontSize: {
                        xs: "14px",
                        lg: "1.5vw",
                        xl: "1.5vw",
                      },
                      fontWeight: 600,
                      color: "#FFFFFF", // soft pink ASK
                    }}
                  >
                    {formatPrice(row.ask)}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Box>
    </Box>
  );
};

export default CommodityTable;

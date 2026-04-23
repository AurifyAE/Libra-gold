// SpotRateContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const SpotRateContext = createContext();

export const SpotRateProvider = ({ children }) => {
    const [goldData, setGoldData] = useState({ bid: 0, ask: 0 });
    const [silverData, setSilverData] = useState({ bid: 0, ask: 0 });
    const [platinumData, setPlatinumData] = useState({ bid: 0, ask: 0 });

    const calculateValues = (bid = 0, bidSpread = 0, askSpread = 0, offset = 0, precision = 2) => {
        const bidValue = Number(bid) + Number(bidSpread);
        const askValue = bidValue + Number(askSpread) + Number(offset);
        return {
            bid: bidValue.toFixed(precision),
            ask: askValue.toFixed(precision),
        };
    };

    const updateMarketData = (marketData, goldBidSpread, goldAskSpread, silverBidSpread, silverAskSpread, platinumBidSpread, platinumAskSpread) => {


        
        if (marketData) {
            const goldValues = calculateValues(marketData.Gold?.bid, goldBidSpread, goldAskSpread, 0.5);


            setGoldData({
                bid: goldValues?.bid,
                ask: goldValues?.ask,
                low: marketData.Gold?.low,
                high: marketData.Gold?.high,
            });

            const silverValues = calculateValues(marketData.Silver?.bid, silverBidSpread, silverAskSpread, 0.05, 3);
            setSilverData({
                bid: silverValues?.bid,
                ask: silverValues?.ask,
                low: marketData.Silver?.low,
                high: marketData.Silver?.high,
            });
            const platinumValues = calculateValues(marketData.Platinum?.bid, platinumBidSpread, platinumAskSpread, 0.05, 3);
            setPlatinumData({
                bid: platinumValues?.bid,
                ask: platinumValues?.ask,
                low: marketData.Platinum?.low,
                high: marketData.Platinum?.high,
            });
        }
    };

    return (
        <SpotRateContext.Provider value={{ goldData, silverData, platinumData, updateMarketData }}>
            {children}
        </SpotRateContext.Provider>
    );
};


export const useSpotRate = () => useContext(SpotRateContext);

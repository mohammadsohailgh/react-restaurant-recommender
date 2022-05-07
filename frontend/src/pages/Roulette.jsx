import React from 'react'
import { Wheel } from 'react-custom-roulette'
import { useState } from 'react'


function Roulette() {

    const data = [
        { id: 1, option: 10 },
        { id: 2, option: -30 },
        { id: 3, option: 50 },
        { id: 4, option: 30 },
        { id: 5, option: 40 },
        { id: 6, option: 20 }
      ];

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
  
    const handleSpinClick = () => {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    };
  return (
    <div>Roulette


{/* <Wheel
      mustStartSpinning={mustSpin}
      prizeNumber={3}
      data={data}
      backgroundColors={['#3e3e3e', '#df3428']}
      textColors={['#ffffff']}
    /> */}
<>
      <div align="center">
        <h1 align="center">Roulette Game</h1>
        <hr />
        <Wheel
          spinDuration={0.3}
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          outerBorderColor={["#f2f2f2"]}
          outerBorderWidth={[25]}
          innerBorderColor={["#f2f2f2"]}
          radiusLineColor={["#dedede"]}
          radiusLineWidth={[10]}
          textColors={["#ffffff"]}
          fontSize={[50]}
          perpendicularText={[true]}
          backgroundColors={[
            "#F22B35",
            "#F99533",
            "#24CA69",
            "#514E50",
            "#46AEFF",
            "#9145B7"
          ]}
          onStopSpinning={() => {
            setMustSpin(false);
          }}
        />
        
        <br />
        {!mustSpin ? data[prizeNumber].option : "0"}
        <hr />

        <button className="btn btn-primary" onClick={handleSpinClick}>
          SPIN
        </button>
      </div>
    </>


    </div>
  )
}

export default Roulette
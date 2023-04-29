import React from "react";
import { Block } from "./Block";
import "./index.css";
import { useState, useEffect } from "react";

function App() {
  const [first, setFirst] = useState("PLN");
  const [second, setSecond] = useState("USD");
  const [converted, setConverted] = useState({});
  const [firstValue, setFirstValue] = useState(1);
  const [secondValue, setSecondValue] = useState(0);

  useEffect(() => {
    fetch(
      "https://openexchangerates.org/api/latest.json?app_id=19e5222147e341b0be32475c0679d4d0"
    )
      .then((el) => el.json())
      .then((el) => {
        setConverted(el.rates);
        onChangeValueFirst(1);
        setSecondValue((1 / el.rates[first]).toFixed(2));
      })
      .catch((err) => {
        console.warn(err);
        alert("ERROR!");
      });
  }, []);

  const onChangeValueFirst = (val) => {
    const firstVal = val / converted[first];
    const result = firstVal * converted[second];

    setFirstValue(val);
    setSecondValue(result.toFixed(2));
  };

  const onChangeValueSec = (val) => {
    const firstVal = val / converted[second];
    const result = firstVal * converted[first];
    setSecondValue(val);
    setFirstValue(result.toFixed(2));
  };

  return (
    <div className="App">
      <Block
        value={firstValue}
        currency={first}
        onChangeCurrency={setFirst}
        onChangeValue={onChangeValueFirst}
      />
      <Block
        value={secondValue}
        currency={second}
        onChangeCurrency={setSecond}
        onChangeValue={onChangeValueSec}
      />
    </div>
  );
}

export default App;

// function App() {
//   const [fromCurrency, setFromCurrency] = useState('PLN');
//   const [toCurrency, setToCurrency] = useState('USD');
//   const [fromPrice, setFromPrice] = useState(0);
//   const [toPrice, setToPrice] = useState(0);

//   const [rate, setRate] = useState({});

//   useEffect(() => {

//     fetch('https://openexchangerates.org/api/latest.json?app_id=19e5222147e341b0be32475c0679d4d0')
//       .then((response) => response.json())
//       .then((data) => {
//         setRate(data.rates)
//         console.log(data)
//       })
//       .catch((err) => {
//         console.warn(err)
//         alert('Не удалось получить информацию')
//       })
//   }, [])

//   const onChangeValueFrom = (val) => {
//     const price = val / rate[fromCurrency];
//     const finall = (price * rate[toCurrency]).toFixed(2);
//     setFromPrice(val);
//     setToPrice(finall);
//   };

//   const onChangeValueTo = (val) => {
//     const price = val / rate[toCurrency];
//     const finalPrice = (price * rate[fromCurrency]).toFixed(1);
//     setToPrice(val);
//     setFromPrice(finalPrice);
//   };

//   // дожидаемся перерисовки элемента , и только посел этого сделаем вычисления

//   useEffect(() => {
//     onChangeValueFrom(fromPrice)
//   }, [fromCurrency, fromPrice])

//   useEffect(() => {
//     onChangeValueTo(toPrice)
//   }, [toCurrency, toPrice])

//   return (
//     <div className="App">
//       <Block
//         value={fromPrice}
//         currency={fromCurrency}
//         onChangeCurrency={setFromCurrency}
//         onChangeValue={onChangeValueFrom}
//       />
//       <Block
//         value={toPrice}
//         currency={toCurrency}
//         onChangeCurrency={setToCurrency}
//         onChangeValue={onChangeValueTo}
//       />
//     </div>
//   );
// }

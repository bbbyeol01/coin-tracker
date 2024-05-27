import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollar, setDollar] = useState("");
  const [price, setPrice] = useState("");
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  function onChange(e) {
    const dollarValue = e.target.value;
    setDollar(dollarValue);
    setPrice(dollarValue === "" ? "" : dollar * price);
  }

  function onSelect(e) {
    setPrice(e.target.value * dollar);
  }

  return (
    <div>
      <h1>Coin Converter</h1>
      {loading ? <p>Loading...</p> : null}
      <input
        value={dollar}
        type="number"
        onChange={onChange}
        placeholder="Dollars"
      />
      USD
      <br />
      <br />
      <select onChange={onSelect}>
        <option>Select your coin</option>
        {coins.map((coin) => (
          <option value={coin.quotes.USD.price} key={coin.id} id={coin.symbol}>
            {coin.name}({coin.symbol})
          </option>
        ))}
      </select>
      <h1>
        {price}
        {symbol}
      </h1>
    </div>
  );
}

export default App;

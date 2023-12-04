import RenderManyCharts from "./RenderManyCharts";
import { formatPrice } from "../helpers/formatPrice";
// React component for rendering a list of coins
// This component exports the RenderCoins function as the default export
export default function RenderCoins({ limit, coins, searchInput }) {
  // Function to render the loading section
  const RenderLoading = () => {
    return (
      <div className="loading-container">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

  // Function to render the coin table
  const RenderCoinTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price usd</th>
            <th>Percent change 15min</th>
            <th>Percent change 5min</th>
          </tr>
        </thead>
        <tbody>
          {filterAndMapCoins().map(
            (coin, index) =>
              // Conditional rendering to limit based on the index
              index <= limit && (
                <tr className="coin" key={coin.id}>
                  <td>{coin.coin_name}</td>
                  <td>{coin.coin_symbol}</td>
                  <td>{formatPrice(coin.coin_price)}</td>
                  <td>{coin.percent_change_15min}</td>
                  <td>{coin.percent_change_5min}</td>
                  <td>
                    <RenderManyCharts chartData={coin} />
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    );
  };

  // Function to filter and map coins based on the search input
  const filterAndMapCoins = () => {
    return coins.filter(
      (val) =>
        // Display all coins if search input is empty
        searchInput === "" ||
        // Filter coins by name or symbol, case-insensitive
        val.coin_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        val.coin_symbol.toLowerCase().includes(searchInput.toLowerCase())
    );
  };
  // Render the component
  return <div>{!coins ? <RenderLoading /> : <RenderCoinTable />}</div>;
}

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
            <th>Market cap usd</th>
            <th>c supply</th>
            <th>Price change 24h</th>
          </tr>
        </thead>
        <tbody>
          {filterAndMapCoins().map(
            (coin, index) =>
              // Conditional rendering to limit based on the index
              index <= limit && (
                <tr className="coin" key={coin.id}>
                  <td>{coin.name}</td>
                  <td>{coin.symbol}</td>
                  <td>{coin.price_usd}</td>
                  <td>{coin.market_cap_usd}</td>
                  <td>{coin.csupply}</td>
                  <td>{coin.percent_change_24h}</td>
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
        val.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        val.symbol.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  // Render the component
  return <div>{!coins ? <RenderLoading /> : <RenderCoinTable />}</div>;
}

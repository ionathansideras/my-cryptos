// Function to filter and map coins based on the search input
export const filterAndMapCoins = (coins, searchInput) => {
    return [...coins].filter(
      (val) =>
        // Display all coins if search input is empty
        searchInput === "" ||
        // Filter coins by name or symbol, case-insensitive
        val.coin_name.toLowerCase().includes(searchInput.toLowerCase()) ||
        val.coin_symbol.toLowerCase().includes(searchInput.toLowerCase())        
    );
  };

import star1 from "../assets/star1.png";
import star2 from "../assets/star2.png";

// Function to handle the image source
export const handleSrcStarChange = (symbol, favorites) => {
    // If the symbol is in the favorites, display the filled star
    if (!favorites?.includes(symbol)) {
      return star1;
    }
    // If the symbol is not in the favorites, display the empty star
    else {
      return star2;
    }
  };
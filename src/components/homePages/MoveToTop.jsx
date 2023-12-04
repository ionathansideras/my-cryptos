import { moveUp } from "../../helpers/moveUp";
// Functional component named MoveToTop
export default function MoveToTop() {
  // Render a button labeled "Move Up"
  // When the button is clicked, it triggers the 'moveUp' function
  return <button onClick={moveUp}>Move Up</button>;
}

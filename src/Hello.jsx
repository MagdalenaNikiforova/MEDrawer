import { Link } from "react-router-dom";

function Hello() {
  return (
    <div>
      <h1>Hello Page</h1>
      <Link to="/">Go back Home</Link>
    </div>
  );
}

export default Hello;

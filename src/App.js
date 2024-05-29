import "./App.scss";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
      <Outlet />
      </ErrorBoundary>
    </div>
  );
}

export default App;
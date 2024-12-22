import Canvas from "./app/Canvas";
import Sidebar from "./app/Sidebar";
import TopSearch from "./app/TopSearch";

const App = () => {
  return (
    <div className="container">
      
      <div className="sidebar">
        <Sidebar/>
      </div>
      <div className="canvas">
        <TopSearch/>
        <Canvas/>
      </div>
    </div>
  );
};

export default App;

import { useState } from "react";
import "./App.css";
import dataList from "./constants/data";
import MakeSortable from "./components/MakeSortable";
import Item from "./components/Item";

function App() {
  const [isDragging, setIsDragging] = useState(false);

  const components = dataList.map((component) => (
    <Item
      key={component?.id}
      component={component}
      setIsDragging={setIsDragging}
    />
  ));

  const [componentList, setComponentList] = useState(components);

  return (
    <>
      <h2>Sortable components</h2>
      <MakeSortable
        componentList={componentList}
        onSort={(componentList) => setComponentList(componentList)}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      >
        {componentList}
      </MakeSortable>
    </>
  );
}

export default App;

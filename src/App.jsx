import './App.css';
import makeSortableComponents from "./components/makeSortableComponents";

function App() {
  const componentList = [
    <div key={1}>Component 1</div>,
    <div key={2}>Component 2</div>,
    <div key={3}>Component 3</div>,
  ];

  const SortableList = makeSortableComponents(componentList); 

  return (
    <>
     <h2>Sortable components</h2>
     <SortableList />
    </>
  );
}

export default App;

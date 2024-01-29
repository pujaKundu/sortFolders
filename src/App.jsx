import './App.css';
import makeSortableComponents from "./components/makeSortableComponents";

function App() {
  const componentList = [
    { id: 1, content: 'Component 1', bgColor: 'coral' },
    { id: 2, content: 'Component 2', bgColor: '#66ccff' },
    { id: 3, content: 'Component 3', bgColor: '#ff6666' },
    { id: 4, content: 'Component 4', bgColor: '#aacd70' },
    // { id: 5, content: 'Component 5', bgColor: '#1a1a1a' },
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

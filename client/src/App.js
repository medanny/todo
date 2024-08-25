import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import {useEffect, useState} from 'react';
function App() {
  const [tasks, setTasks] = useState(null);

  const getData = async () =>{
    try {
      console.log('getting items');
      const userEmail = 'daniel@lozano.cc';
      const response = await fetch(`http://localhost:8000/todos/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getData, []);

  //
  const sortedTaks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="app">
      <ListHeader listName={'Holiday'}  />
      {sortedTaks?.map((task) => <ListItem key={task.id} task={task} />)}
    </div>
  );
}

export default App;

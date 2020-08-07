import React, { useState, useEffect } from 'react';
import  { TaskRow } from './components/TaskRow';
import {TaskBanner} from './components/TaskBanner';
import { TaskCreator } from './components/TaskCreator';
import { VisibilityControl } from './components/VisibilityControl';
 
function App() {

  const [userName, setUserName] = useState('fazt');
  const [taskItems, setTaskItem] = useState([{name: 'Task One', done: false}, 
  {name: 'Task Two', done: false},
  {name: 'Task Three', done: true},
  {name: 'Task Four', done: false}
]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem('tasks');
    if (data != null) {
      setTaskItem(JSON.parse(data));
    } else {
      setUserName('Fazt example')
      setTaskItem([
        {name: 'Task One Example', done: false}, 
        {name: 'Task Two Example', done: false},
        {name: 'Task Three Ex', done: true},
        {name: 'Task Four Ex', done: false}
      ])
      setShowCompleted(true);
    }
  }, []);

  useEffect (() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      setTaskItem([...taskItems, {name: taskName, done: false}])
    }
  }

  const toggleTask = task => 
    setTaskItem(taskItems.map(t => (t.name === task.name ? {...t, done: !t.done} : t)))
  

  const taskTableRows = (doneValue) => {
      return taskItems
      .filter(task => task.done === doneValue)
      .map(task => (
        <TaskRow task={task} key={task.name} toggleTask={toggleTask}/>
      ))
  }


  return (
    <div>
      <TaskBanner userName={userName} 
      taskItems={taskItems} />

      <TaskCreator callback={createNewTask} />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>

      <div className="bg-secondary-text-white text-center p-2">
        <VisibilityControl 
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>
      {
        showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {taskTableRows(true)}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;

// import logo from './logo.svg';
// import './App.css';

import TodoContainer from './hooks/todoContainer';

// import Todo from './pages/index.usestate.jsx';
import Todo from './pages';

function App() {
  return (
    <div>
      <main>
        <TodoContainer>
          <Todo></Todo>
        </TodoContainer>
      </main>
    </div >
  );
}

export default App;

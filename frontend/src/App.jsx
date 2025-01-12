// App.jsx
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import Page from './Page'; // Your Page component

// App component that wraps Page inside BrowserRouter
const App = () => {
  return (
    <BrowserRouter>
      <Page />
    </BrowserRouter>
  );
};

export default App;

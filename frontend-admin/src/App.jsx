import Header from './components/Header';
import Menu from './components/Menu';
import './index.css';


function App() {
  return (
    <div className="flex items-center min-h-screen bg-gray-600 flex-col">
      <Header />
      <Menu />
    </div>
  );
}

export default App;




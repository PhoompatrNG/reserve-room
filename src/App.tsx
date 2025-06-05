import './css/App.css';
import Home from './room/home';
import ReserveRoomModal from './room/reserve_room_modal';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header'; // Import Header
import Footer from './components/Footer'; // Import Footer

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <Home />
        <Footer />
        {/* <ReserveRoomModal /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;

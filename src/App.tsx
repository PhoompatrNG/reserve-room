import './css/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './room/home';
import AddRoom from './room/add_room';
import ShowTimeline from './room/show_timeline';
import ReserveRoom from './room/reserve_room';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/add-room" element={<AddRoom />} /> */}
            <Route path="/show-timeline" element={<ShowTimeline />} />
            {/* <Route path="/reserve-room" element={<ReserveRoom />} /> */}
            {/* เพิ่ม Route อื่น ๆ ที่นี่ */}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

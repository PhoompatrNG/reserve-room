
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './css/App.css'
import Home from './room/home'
import ReserveRoomModal from './room/reserve_room_modal'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Home />
      {/* <ReserveRoomModal /> */}
    </BrowserRouter>
  );
}

export default App;

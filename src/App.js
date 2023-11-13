import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/navigation';
const links = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    // errorElement: <Error />,
  },
])
function App() {
  return (
    <RouterProvider router={links} />
  );
}

export default App;

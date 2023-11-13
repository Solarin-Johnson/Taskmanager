import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/navigation';
import Dashboard from './pages/dashboard/dashboard';
const links = createBrowserRouter([
  {
    path: "/",
    element: <><Dashboard /></>,
    errorElement: <><Dashboard /></>,
  },
])
function App() {
  return (
    <RouterProvider router={links} />
  );
}

export default App;

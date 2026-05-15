import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout';
import ProductsPage from './pages/ProductsPage';


export default function App() {
  return (
    <>
      <MainLayout>
        <ProductsPage />
      </MainLayout>

      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          color: '#f1f5f9',
          fontFamily: 'Outfit, sans-serif',
        }}
      />
    </>
  );
}

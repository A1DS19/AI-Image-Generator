import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo_final } from './assets';
import { Home, CreatePost } from './pages';

function App() {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
        <Link to={'/'}>
          <img src={logo_final} alt='logo' className='w-28 object-contain' />
        </Link>
        <Link
          to={'/create-post'}
          className='font-inter font-medium bg-[#6C63FF] text-white px-4 py-2 rounded-md'
        >
          Crear Post
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>

      <footer className='h-50 bg-white w-full py-4 border-b border-b-[#e6ebf4]'>
        <p className='ml-3 mt-2 font-bold'>Jose Padilla {new Date().getFullYear()}</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;

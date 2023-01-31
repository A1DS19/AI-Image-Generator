import React, { useEffect } from 'react';
import { Card, FormField, Loader } from '../components';

const Home = () => {
  const [loading, setLoading] = React.useState(false);
  const [allPosts, setAllPosts] = React.useState(null);
  const [searchText, setSearchText] = React.useState('');
  const [searchedResults, setSearchedResults] = React.useState(null);
  const [searchTimeout, setSearchTimeout] = React.useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/v1/post', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setAllPosts(data.data.reverse());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />);
    }

    return <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>;
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Aportes de la comunidad
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Busca dentro de una colleccion de images creadas por el modelo DALL-E o pulsa el
          boton 'Crear Post' para crear una nueva imagen con inteligencia artificial.
        </p>
      </div>

      <div className='mt-16'>
        <FormField
          labelName='Buscar posts'
          type='text'
          name='text'
          placeholder='Buscar Posts'
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                Resultados de <span className='text-[#222328]'>{searchText}</span>
              </h2>
            )}
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title='No hay resultados para esa busqueda'
                />
              ) : (
                <RenderCards data={allPosts} title='No hay resultados' />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField, Loader } from '../components';
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSupriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });

    return randomPrompt;
  };

  const handleGenerateImg = () => {};

  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Crea una Imagen</h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Escribe lo que quieras y obtendras una imagen
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName='Your name'
            name='name'
            type='text'
            placeholder='Mario Lizano'
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName='Busqueda'
            type='text'
            name='prompt'
            placeholder='A revolver with hot dogs as bullets'
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSupriseMe={handleSupriseMe}
          />

          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className='w-full h-full object-contain'
              />
            ) : (
              <img
                src={preview}
                alt={form.prompt}
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}

            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5 flex gap-5'>
          <button
            type='submit'
            onClick={handleGenerateImg}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg ? 'Generando...' : 'Generar'}
          </button>
        </div>

        <div className='mt-10'>
          <p className='mt-2 text-[#666e75] text-[14px]'>
            Cuando crees tu image la puedes compartir con la comunidad
          </p>
          <button
            type='submit'
            className=' rounded-md mt-3 text-white bg-[#6469ff] font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? 'Compartiendo...' : 'Compartir con la comunidad'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;

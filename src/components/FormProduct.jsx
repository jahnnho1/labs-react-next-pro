import { useRef } from 'react';
import { addProduct, updateProduct } from '@services/api/product';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function FormProduct({ setOpen, setAlert, product }) {
  const formRef = useRef(null);
  const router = useRouter();
  console.log(product);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);

    const obj = {
      title: data.title,
      price: parseInt(data.precio),
      description: data.descripcion,
      categoryId: parseInt(data.categoria),
      images: ['https://cdna.artstation.com/p/assets/images/images/046/235/272/smaller_square/pixel-arts-de-un-nino-random-ranita-uwu.jpg?1644605499'],
    };

    if (product) {
      updateProduct(product.id, obj)
        .then(() => {
          console.log('Product updated successfully');
          router.push('/dashboard/products');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      addProduct(obj)
        .then(() => {
          setAlert({ active: true, message: 'Product added successfully', type: 'success', autoClose: false });
          setOpen(false);
        })
        .catch((err) => {
          setAlert({ active: true, message: err.message, type: 'error', autoClose: false });
          setOpen(false);
        });
    }
  };
  
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-10">
            <div className="sm:col-span-12">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  defaultValue={product?.title}
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-12">
              <label htmlFor="descripcion" className="block text-sm font-medium leading-6 text-gray-900">
                Descripcion
              </label>
              <div className="mt-2">
                <input
                  defaultValue={product?.description}
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-12">
              <label htmlFor="precio" className="block text-sm font-medium leading-6 text-gray-900">
                Precio
              </label>
              <div className="mt-2">
                <input
                  defaultValue={product?.price}
                  id="precio"
                  name="precio"
                  type="number"
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-12">
              <label htmlFor="categoria" className="block text-sm font-medium leading-6 text-gray-900">
                Categoria
              </label>
              <div className="mt-2">
                <select
                  defaultValue={product?.category?.id}
                  value={product?.category?.id}
                  id="categoria"
                  name="categoria"
                  autoComplete="categoria-name"
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="1">Clothes</option>
                  <option value="2">Electronics</option>
                  <option value="3">Furniture</option>
                  <option value="4">Toys</option>
                  <option value="5">Others</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          <Link href={`/dashboard/products`}> cancelar</Link>
        </button>
        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
  );
}

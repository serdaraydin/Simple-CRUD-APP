import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Swal from 'sweetalert2'
import { VITE_BACKEND_URL } from '../App.jsx'

const Product = ({ product, getProducts }) => {

  const deleteProduct = async (id) => {

    const result = await Swal.fire({
      title: "Do you really want to delete product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"

    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`);
        toast.success("Product deleted successfully")
        getProducts();
  
      } catch (error) {
        toast.error(error.message)
      }

    }

  };

  return (
    <div className=' bg-white shadow-lg overflow-hidden'>
        <img src={product.image} className=' w-full h-28 object-cover' />
        <div className=' px-4 pt-2 pb-4'>
            <h2 className=' text font-semibold'>{product.name}</h2>
            <h2 className=' text-sm'>Quantity: {product.quantity}</h2>
            <h2 className=' text-sm'>Price: ${product.price}</h2>
            <div className=' mt-2 flex gap-4'>
                <Link to={`/edit/${product._id}`} className=' inline-block text-sm  py-1 bg-gray-700 font-bold hover:bg-gray-500 text-white hover:cursor-pointer w-full text-center shadow-md rounded-sm px-4'>Edit</Link>
                <button
                onClick={() => deleteProduct(product._id)}
                className=' inline-block text-sm  py-1 bg-red-700 font-bold hover:bg-red-500 text-white hover:cursor-pointer w-full text-center shadow-md rounded-sm px-4'
                >
                Delete
                </button>
            </div>
        </div>
    </div>
  )
}

export default Product
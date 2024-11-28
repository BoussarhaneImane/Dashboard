import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm'; // Import the ProductForm component

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleDelete = (productId) => {
    fetch(`http://localhost:5000/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setProducts(products.filter((product) => product.id !== productId));
        } else {
          console.error('Failed to delete product');
        }
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleAdd = () => {
    setSelectedProduct(null); // No product selected for add
    setIsFormVisible(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product); // Set the product to be edited
    setIsFormVisible(true);
  };

  const handleSave = (newProduct) => {
    if (selectedProduct) {
      // Edit existing product
      fetch(`http://localhost:5000/api/products/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })
        .then(response => {
          if (response.ok) {
            setProducts(products.map((prod) => (prod.id === selectedProduct.id ? { ...prod, ...newProduct } : prod)));
            setIsFormVisible(false);
            setSelectedProduct(null);
          } else {
            console.error('Failed to update product');
          }
        })
        .catch(error => console.error('Error updating product:', error));
    } else {
      // Add new product
      fetch(`http://localhost:5000/api/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error('Failed to add product');
          }
        })
        .then(data => {
          setProducts([...products, data]);
          setIsFormVisible(false);
        })
        .catch(error => console.error('Error adding product:', error));
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setSelectedProduct(null);
  };

  return (
    <div className="lg:ml-52 w-full pl-16 items-center justify-center min-h-screen font-medium">
      <div className="product-table-container mx-auto p-24 bg-white dark:bg-slate-950 shadow-lg rounded-lg transition-colors duration-300">
        <h2 className={`text-2xl pb-9 pt-8 font-bold tracking-wide mb-6 decoration-black underline dark:decoration-gray-300 dark:text-gray-300 decoration-4 underline-offset-4`}>
          Liste des Produits
        </h2>

        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50" style={{ marginLeft: '16rem' }}>
            <div className="bg-white dark:bg-slate-800 p-4 rounded shadow-lg">
              <ProductForm product={selectedProduct} onSave={handleSave} onCancel={handleCancel} />
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full cursor-pointer bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg transition duration-300">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b font-medium bg-slate-950 text-white dark:text-gray-100 text-center transition duration-300">Image</th>
                <th className="py-3 px-4 border-b font-medium bg-slate-950 text-white dark:text-gray-100 text-center transition duration-300">Titre</th>
                <th className="py-3 px-4 border-b font-medium bg-slate-950 text-white dark:text-gray-100 text-center transition duration-300">Prix</th>
                <th className="py-3 px-4 border-b font-medium bg-slate-950 text-white dark:text-gray-100 text-center transition duration-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300">
                  <td className="py-3 px-4 border-b text-center">
                    <img src={`http://localhost:5000${product.img}`} alt={product.title} className="h-16 w-16 object-cover rounded mx-auto" />
                  </td>
                  <td className="py-3 px-4 border-b font-medium text-gray-800 dark:text-gray-100 text-center transition duration-300">
                    {product.title}
                  </td>
                  <td className="py-3 px-4 border-b font-medium text-gray-800 dark:text-gray-100 text-center transition duration-300">
                    ${product.price}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    <button
                      className="bg-green-400 hover:bg-green-700 dark:bg-green-400 dark:hover:bg-green-500 text-white font-medium py-1 px-2 rounded transition-colors duration-300"
                      onClick={handleAdd}
                    >
                      Ajouter
                    </button>
                    <button
                      className="bg-blue-300 hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500 text-white font-medium py-1 px-2 mx-2 rounded transition-colors duration-300"
                      onClick={() => handleEdit(product)}
                    >
                      Éditer
                    </button>
                    <button
                      className="bg-red-400 hover:bg-red-700 dark:bg-red-400 dark:hover:bg-red-500 text-white font-medium py-1 px-2 rounded transition-colors duration-300"
                      onClick={() => handleDelete(product.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;

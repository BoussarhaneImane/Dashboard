import React, { useState, useEffect } from 'react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [img, setImg] = useState('');

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setImg(product.img);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = { title, price, img };
    onSave(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Titre du produit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded w-80"
        />
        <input
          type="text"
          placeholder="Prix du produit"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="URL de l'image"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-300 text-white py-1 rounded">
          Enregistrer
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white py-1 rounded">
          Annuler
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

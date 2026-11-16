// Interfaz para el producto que viene de DummyJSON
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
}

// Interfaz para el elemento dentro del carrito
export interface CartItem {
  product: Product;
  quantity: number;
}
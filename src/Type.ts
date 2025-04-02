export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
  createdAt: string;
};

export type BanersType = {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
  createdAt: string;
};

export type OrdersType = {
  id: number;
  customerId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: [
    {
      id: number;
      orderId: number;
      productId: number;
      quantity: number;
      price: number;
    }
  ];
};

export type ProductsType = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  createdAt: string;
  imageUrl: string;
};

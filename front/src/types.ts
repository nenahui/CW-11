export interface LoginMutation {
  username: string;
  password: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayName: string;
  phone: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Category {
  _id: string;
  title: 'iPhone' | 'MacBook' | 'Apple Watch';
}

export interface Salesman {
  _id: string;
  displayName: string;
  phone: string;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  user: Salesman;
}

export interface ProductMutation {
  title: string;
  description: string;
  price: string;
  image: File | null;
  category: string;
}

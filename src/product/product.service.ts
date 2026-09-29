import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  getproduct() {
    return [
      { id: 1, name: 'Laptop', price: 50000 },
      { id: 2, name: 'Phone', price: 25000 },
      { id: 3, name: 'Headphones', price: 3000 },
      { id: 4, name: 'Keyboard', price: 2000 },
      { id: 5, name: 'Mouse', price: 1000 },
    ];
  }
}

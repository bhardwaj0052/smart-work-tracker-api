import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

interface Product {
  id: number;
  name: string;
  price: number;
}
@Controller('product')
export class ProductController {
  constructor(private readonly productservice: ProductService) {}

  @Get()
  getproduct(): Product[] {
    return this.productservice.getproduct();
  }
}

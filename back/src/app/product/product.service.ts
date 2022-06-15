import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>
    ) {}

    create(createProductDto: CreateProductDto) {
        return this.productRepo.save(createProductDto);
    }

    findAll() {
        return this.productRepo.find({
            order: {
                name: 'ASC',
            },
        });
    }

    findOne(id: number) {
        return this.productRepo.findOne(id);
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return this.productRepo.update(id, updateProductDto);
    }

    remove(id: number) {
        return this.productRepo.delete(id);
    }
}

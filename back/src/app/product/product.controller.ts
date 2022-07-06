import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    InternalServerErrorException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    async create(@Body() createProductDto: CreateProductDto) {
        try {
            return await this.productService.create(createProductDto);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get(':site_id')
    findAll(@Param(':site_id') siteId: string) {
        return this.productService.findAll(siteId);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        try {
            return await this.productService.update(+id, updateProductDto);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.productService.remove(+id);
        } catch (error) {
            throw new InternalServerErrorException(
                'Vous ne pouvez supprimer un produit qui est utilisé dans une commande existante'
            );
        }
    }
}

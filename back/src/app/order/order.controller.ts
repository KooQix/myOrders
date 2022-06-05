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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        try {
            return await this.orderService.create(createOrderDto);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage ?? error);
        }
    }

    @Post('findAll')
    async findAll(@Body() body: any) {
        try {
            return await this.orderService.findAll(body?.date);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage ?? error);
        }
    }

    @Post('date')
    async findAllByDate(@Body() date: any) {
        try {
            return await this.orderService.findAllByDate(date.date);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage ?? error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.orderService.findOne(+id);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage ?? error);
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateOrderDto: UpdateOrderDto
    ) {
        try {
            return await this.orderService.update(+id, updateOrderDto);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage ?? error);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.orderService.remove(+id);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage ?? error);
        }
    }
}

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

interface BodyOrder {
    date?: Date;
    site_id: string;
}

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
    async findAll(@Body() body: BodyOrder) {
        try {
            return await this.orderService.findAll(body.site_id, body?.date);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage ?? error);
        }
    }

    @Post('date')
    async findAllByDate(@Body() body: BodyOrder) {
        try {
            return await this.orderService.findAllByDate(
                body.site_id,
                body.date
            );
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

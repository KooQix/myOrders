import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order) private readonly orderRepo: Repository<Order>
    ) {}

    create(createOrderDto: CreateOrderDto) {
        return this.orderRepo.save(createOrderDto);
    }

    findAll(date?: Date) {
        if (!!date) {
            // Since no time given, default hour set to 1 AM
            return this.orderRepo.find({
                where: {
                    date_chargement: date + ' 01:00:00',
                },
            });
        }
        return this.orderRepo.find();
    }

    findOne(id: number) {
        return this.orderRepo.findOne(id);
    }

    update(id: number, updateOrderDto: UpdateOrderDto) {
        return this.orderRepo.update(id, updateOrderDto);
    }

    remove(id: number) {
        return this.orderRepo.delete(id);
    }
}

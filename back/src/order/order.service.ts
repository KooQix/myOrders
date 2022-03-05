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
            // const betweenDates = (_date: Date) => {
            //     return Between(
            //         _date.setHours(0, 0, 0),
            //         _date.setHours(23, 59, 59)
            //     );
            // };
            return this.orderRepo.find({
                where: {
                    date_chargement: date,
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

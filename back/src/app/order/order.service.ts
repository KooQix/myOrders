import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
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
            return this.orderRepo.find({
                where: {
                    date_chargement: Like(`${date}%`),
                },
            });
        }
        return this.orderRepo.find();
    }

    findOne(id: number) {
        return this.orderRepo.findOne(id);
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        return this.orderRepo.save(updateOrderDto);
    }

    remove(id: number) {
        return this.orderRepo.delete(id);
    }

    upd(orders: Order[]) {
        for (const order of orders) {
            if (order.client.addresses.length == 0 || order.client) {
                this.remove(order.id);
            }
            // const nbAddresses = order.client.addresses.length;
            // const address =
            //     order.client.addresses[Math.floor(Math.random() * nbAddresses)];

            // let o = order;
            // o.address = address;

            // this.update(order.id, o);
        }
    }
}

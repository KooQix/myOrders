import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, LessThan } from 'typeorm';
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
                    date_chargement: LessThan(date),
                },
                order: {
                    date_chargement: 'DESC',
                },
                take: 500,
            });
        }

        return this.orderRepo.find({
            order: {
                date_chargement: 'DESC',
            },
            take: 500,
        });
    }

    /**
     * Get all orders for a given date
     *
     * @param date
     * @returns
     */
    findAllByDate(date: Date) {
        return this.orderRepo.find({
            where: {
                date_chargement: Like(`${date}%`),
            },
            order: {
                date_chargement: 'DESC',
            },
        });
    }

    findOne(id: number) {
        return this.orderRepo.findOne(id);
    }

    async update(id: number, updateOrderDto: UpdateOrderDto) {
        const order = await this.findOne(id);
        if (!!order.sent) return order;

        return this.orderRepo.save(updateOrderDto);
    }

    async remove(id: number) {
        const order = await this.findOne(id);
        if (!!order.sent) return order;

        return this.orderRepo.delete(id);
    }
}

import { IsNotEmpty, Min, IsDateString } from 'class-validator';
import { Address } from 'src/app/address/entities/address.entity';
import { Client } from 'src/app/client/entities/client.entity';
import { Operator } from 'src/app/operator/entities/operator.entity';
import { Product } from 'src/app/product/entities/product.entity';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsDateString()
    date_chargement: Date;

    @IsNotEmpty()
    @IsDateString()
    date_dechargement: Date;

    @IsNotEmpty()
    client: Client;

    @IsNotEmpty()
    address: Address;

    @IsNotEmpty()
    @Min(0)
    price: number;

    @IsNotEmpty()
    product: Product;

    operators: Operator[];
}

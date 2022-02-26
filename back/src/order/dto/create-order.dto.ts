import { IsNotEmpty, Min, IsDateString } from 'class-validator';
import { Address } from 'src/address/entities/address.entity';
import { Client } from 'src/client/entities/client.entity';
import { Operator } from 'src/operator/entities/operator.entity';

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
    produit: string;
}

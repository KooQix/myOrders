import { IsNotEmpty, IsDate, Min, ValidateNested } from 'class-validator';
import { Address } from 'src/address/entities/address.entity';
import { Client } from 'src/client/entities/client.entity';
import { Operator } from 'src/operator/entities/operator.entity';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsDate()
    date_chargement: string;

    @IsNotEmpty()
    @IsDate()
    date_dechargement: string;

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

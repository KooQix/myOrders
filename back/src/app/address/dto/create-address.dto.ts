import { IsNotEmpty } from 'class-validator';
import { Client } from 'src/app/client/entities/client.entity';

export class CreateAddressDto {
    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    zip: number;

    @IsNotEmpty()
    street: string;

    @IsNotEmpty()
    client: Client;
}

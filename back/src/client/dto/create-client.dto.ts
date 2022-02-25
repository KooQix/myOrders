import {
    IsNotEmpty,
    ValidateNested,
    ArrayNotEmpty,
    IsDefined,
    IsArray,
} from 'class-validator';
import { Address } from 'src/address/entities/address.entity';
import { Type } from 'class-transformer';

export class CreateClientDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    phone: string;

    @ValidateNested({ each: true }) // Means that it will also validate the address, according to the Adress validator
    @IsDefined()
    @Type(() => Address)
    @IsArray()
    @IsNotEmpty()
    @ArrayNotEmpty()
    addresses: Address[];
}

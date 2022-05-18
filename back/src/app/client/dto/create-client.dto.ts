import {
    IsNotEmpty,
    ValidateNested,
    ArrayNotEmpty,
    IsDefined,
    IsArray,
    MinLength,
} from 'class-validator';
import { Address } from 'src/app/address/entities/address.entity';
import { Type } from 'class-transformer';

export class CreateClientDto {
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @MinLength(2)
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

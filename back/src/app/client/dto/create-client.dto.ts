import {
    IsNotEmpty,
    ValidateNested,
    ArrayNotEmpty,
    IsDefined,
    IsArray,
    MinLength,
    IsInt,
    Length,
} from 'class-validator';
import { Address } from 'src/app/address/entities/address.entity';
import { Type } from 'class-transformer';
import { Site } from 'src/app/site/entities/site.entity';

export class CreateClientDto {
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @MinLength(2)
    surname: string;

    @IsNotEmpty()
    @Length(9)
    phone: string;

    @ValidateNested({ each: true }) // Means that it will also validate the address, according to the Adress validator
    @IsDefined()
    @Type(() => Address)
    @IsArray()
    @IsNotEmpty()
    @ArrayNotEmpty()
    addresses: Address[];
}

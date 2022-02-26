import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateOperatorDto {
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsNotEmpty()
    @MinLength(2)
    surname: string;

    @IsNotEmpty()
    phone: string;
}

import { IsNotEmpty } from 'class-validator';

export class CreateOperatorDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    surname: string;

    @IsNotEmpty()
    phone: string;
}

import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    zip: string;

    @IsNotEmpty()
    @Length(9)
    phone: string;

    @IsNotEmpty()
    paid_per_day: boolean;
}

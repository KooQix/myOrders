import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    zip: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    paid_per_day: boolean;
}

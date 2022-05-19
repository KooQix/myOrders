import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    zip: string;

    @IsNotEmpty()
    @IsInt({ message: 'Le champ numéro de téléphone doit être valide' })
    phone: number;

    @IsNotEmpty()
    paid_per_day: boolean;
}

import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class CreateOperatorDto {
    @IsNotEmpty()
    @MinLength(2)
    surname: string;

    @IsNotEmpty()
    @IsInt({ message: 'Le champ numéro de téléphone doit être valide' })
    phone: number;
}

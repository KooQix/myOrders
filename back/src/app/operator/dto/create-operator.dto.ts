import { IsInt, IsNotEmpty, Length, MinLength } from 'class-validator';

export class CreateOperatorDto {
    @IsNotEmpty()
    @MinLength(2)
    surname: string;

    @IsNotEmpty()
    @Length(9)
    phone: string;
}

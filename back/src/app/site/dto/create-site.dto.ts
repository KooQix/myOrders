import { IsNotEmpty } from 'class-validator';

export class CreateSiteDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    password: string;
}

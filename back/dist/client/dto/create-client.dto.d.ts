import { Address } from 'src/address/entities/address.entity';
export declare class CreateClientDto {
    name: string;
    surname: string;
    phone: string;
    addresses: Address[];
}

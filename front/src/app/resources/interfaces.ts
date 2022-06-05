export interface Order {
    id?: number;
    date_chargement: string;
    date_dechargement: string;
    client: Client;
    address: Address;
    price: number;
    tonnage: number;
    deblais: number;
    operators?: Operator[];
    product: Product;
    info?: string;
    color?: string;
    sent?: boolean;
}

export interface Address {
    id?: number;
    code_chantier?: string;
    city: string;
    zip: number;
    street: string;
    number?: number;
    client?: number;
}

export interface Client {
    id?: number;
    name: string;
    surname: string;
    phone: string;
    addresses: Address[];
}

export interface Operator {
    id?: number;
    name?: string;
    surname: string;
    company?: Company;
    phone: string;
}

export interface Company {
    id?: number;
    name: string;
    city: string;
    zip: string;
    paid_per_day: boolean;
    phone: string;
    operators?: Operator[];
}

export interface Product {
    id?: number;
    name: string;
    price: number;
}

export interface Message {
    phone: number;
    message: string;
}

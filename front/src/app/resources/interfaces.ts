export interface Order {
    id?: number;
    date_chargement: string;
    date_dechargement: string;
    client: Client;
    address: Address;
    price: number;
    operators?: Operator[];
    produit: string;
    info?: string;
    color?: string;
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
    company?: string;
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

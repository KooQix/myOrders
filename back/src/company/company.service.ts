import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepo: Repository<Company>
    ) {}

    create(createCompanyDto: CreateCompanyDto) {
        return this.companyRepo.save(createCompanyDto);
    }

    findAll() {
        return this.companyRepo.find();
    }

    findOne(id: number) {
        return this.companyRepo.findOne(id);
    }

    update(id: number, updateCompanyDto: UpdateCompanyDto) {
        return this.companyRepo.update(id, updateCompanyDto);
    }

    remove(id: number) {
        return this.companyRepo.delete(id);
    }
}

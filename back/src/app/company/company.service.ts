import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperatorService } from 'src/app/operator/operator.service';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepo: Repository<Company>,
        private opService: OperatorService
    ) {}

    create(createCompanyDto: CreateCompanyDto) {
        return this.companyRepo.save(createCompanyDto);
    }

    findAll() {
        return this.companyRepo.find();
    }

    findAllOperators(id: string) {
        return this.opService.findAllByCompany(id);
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

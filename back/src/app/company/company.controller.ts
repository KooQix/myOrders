import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}

    @Post()
    create(@Body() createCompanyDto: CreateCompanyDto) {
        return this.companyService.create(createCompanyDto);
    }

    @Get()
    findAll() {
        return this.companyService.findAll();
    }

    @Get('operators/:id')
    findAllOperators(@Param('id') id: string) {
        return this.companyService.findAllOperators(id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.companyService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateCompanyDto: UpdateCompanyDto
    ) {
        return this.companyService.update(+id, updateCompanyDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const operators = await this.findAllOperators(id);
        if (!!operators && operators.length > 0) {
            throw new HttpException(
                "L'entreprise ne doit plus contenir de chauffeurs pour pouvoir être supprimée",
                HttpStatus.FORBIDDEN
            );
        }
        return this.companyService.remove(+id);
    }
}

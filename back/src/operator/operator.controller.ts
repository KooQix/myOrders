import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    InternalServerErrorException,
} from '@nestjs/common';
import { OperatorService } from './operator.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';

@Controller('operator')
export class OperatorController {
    constructor(private readonly operatorService: OperatorService) {}

    @Post()
    async create(@Body() createOperatorDto: CreateOperatorDto) {
        try {
            return await this.operatorService.create(createOperatorDto);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.operatorService.findAll();
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.operatorService.findOne(+id);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateOperatorDto: UpdateOperatorDto
    ) {
        try {
            return await this.operatorService.update(+id, updateOperatorDto);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.operatorService.remove(+id);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }
}

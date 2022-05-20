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
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async create(@Body() createClientDto: CreateClientDto) {
        try {
            return await this.clientService.create(createClientDto);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.clientService.findAll();
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return await this.clientService.findOne(+id);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateClientDto: UpdateClientDto
    ) {
        try {
            return await this.clientService.update(+id, updateClientDto);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return await this.clientService.remove(+id);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly service: AddressService) {}

    @Post()
    async create(@Body() createAddressDto: CreateAddressDto) {
        try {
            return await this.service.create(createAddressDto);
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    @Get()
    async findAll() {
        try {
            return await this.service.findAll();
        } catch (error) {
            throw new InternalServerErrorException(error.sqlMessage);
        }
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.service.findOne(+id);
    // }

    // @Patch(':id')
    // update(
    //     @Param('id') id: string,
    //     @Body() updateAddressDto: UpdateAddressDto
    // ) {
    //     return this.service.update(+id, updateAddressDto);
    // }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(+id);
    }
}

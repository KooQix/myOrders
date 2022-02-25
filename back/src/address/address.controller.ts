import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
    constructor(private readonly service: AddressService) {}

    // @Post()
    // create(@Body() createAddressDto: CreateAddressDto) {
    //     return this.service.create(createAddressDto);
    // }

    @Get()
    findAll() {
        return this.service.findAll();
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

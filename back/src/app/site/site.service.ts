import { Site } from './entities/site.entity';
import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SiteService {
    constructor(
        @InjectRepository(Site)
        private readonly repository: Repository<Site>
    ) {}

    create(createSiteDto: CreateSiteDto) {
        return this.repository.create(createSiteDto);
    }

    findAll() {
        return this.repository.find();
    }

    async findOne(id: number) {
        return this.repository.findOne(id);
    }

    update(id: number, updateSiteDto: UpdateSiteDto) {
        if (updateSiteDto.password === '*******') delete updateSiteDto.password;
        return this.repository.update(id, updateSiteDto);
    }

    remove(id: number) {
        return this.repository.delete(id);
    }
}

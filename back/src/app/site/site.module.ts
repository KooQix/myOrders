import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Site])],
    controllers: [SiteController],
    providers: [SiteService],
    exports: [SiteService],
})
export class SiteModule {}

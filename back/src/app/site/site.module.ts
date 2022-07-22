import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './entities/site.entity';
import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forFeature([Site]),
        AuthModule,
        // JwtModule.register({
        //     secret: process.env.JWT_SECRET,
        //     signOptions: { expiresIn: '1h' },
        // }),
    ],
    controllers: [SiteController],
    providers: [SiteService],
    exports: [SiteService],
})
export class SiteModule {}

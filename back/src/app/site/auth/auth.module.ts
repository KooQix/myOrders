import { SiteModule } from './../site.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [PassportModule, JwtModule, SiteModule],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule {}

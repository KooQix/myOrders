import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SiteService } from '../site.service';
import { JwtService } from '@nestjs/jwt';
import { Site } from '../entities/site.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => SiteService)) private siteService: SiteService,
        private jwtService: JwtService
    ) {}

    async validate(id: number, password: string): Promise<Site> {
        try {
            const site = await this.siteService.findOne(+id);
            if (!!!site || site.password !== password) return null;

            if (site.name === 'admin') {
                const payload = {
                    id: site.id,
                    name: site.name,
                };
                site.token = this.jwtService.sign(payload);
            }

            return site;
        } catch (error) {
            return null;
        }
    }
}

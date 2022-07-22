import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ClassSerializerInterceptor,
    UseInterceptors,
    BadRequestException,
    UseGuards,
    Request,
    forwardRef,
    Inject,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

interface LoginRequest {
    id: number;
    password: string;
}

@UseInterceptors(ClassSerializerInterceptor)
@Controller('site')
export class SiteController {
    constructor(
        private siteService: SiteService,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) {}

    @Post()
    create(@Body() createSiteDto: CreateSiteDto) {
        if (createSiteDto.name === 'admin')
            throw new BadRequestException(
                'Admin est un nom de site réservé. Choisissez un autre nom'
            );
        return this.siteService.create(createSiteDto);
    }

    // LocalAuthGuard adds (if credentials ok) the site info inside the request before calling the connection method
    @UseGuards(LocalAuthGuard)
    @Post('login')
    connection(@Request() req: LoginRequest) {
        return this.authService.validate(req.id, req.password);
    }

    @Get('checkToken')
    checkToken() {}

    @Get()
    findAll() {
        return this.siteService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.siteService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSiteDto: UpdateSiteDto) {
        return this.siteService.update(+id, updateSiteDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.siteService.remove(+id);
    }
}

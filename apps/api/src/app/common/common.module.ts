import { Global, Module } from '@nestjs/common';
import { DbConnectionService } from './db-connection';
import { JwtService } from './jwt';

@Global()
@Module({
    providers: [
        DbConnectionService,
        JwtService
    ],
    exports: [
        DbConnectionService,
        JwtService
    ]
})
export class CommonModule {}

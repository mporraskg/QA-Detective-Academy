import { Module } from '@nestjs/common';
import { HealthController } from './modules/health/health.controller';

// Los módulos (auth, users, batches, ...) se irán registrando aquí.
@Module({ controllers: [HealthController] })
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig[0]),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TasksModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }), 
    TypeOrmModule.forRoot(typeOrmConfig), AuthModule],
})
export class AppModule {}

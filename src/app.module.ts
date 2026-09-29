import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [TasksModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

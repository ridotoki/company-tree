import { Module } from '@nestjs/common';
import { TravelService } from './travel.service';
import { HttpModule } from '@nestjs/axios';
import { TravelResolver } from './travel.resolver';

@Module({
  imports: [HttpModule],
  providers: [TravelService, TravelResolver],
  exports: [TravelService],
})
export class TravelModule {}

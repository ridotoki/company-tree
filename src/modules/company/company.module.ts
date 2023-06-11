import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { HttpModule } from '@nestjs/axios';
import { CompanyResolver } from './company.resolver';
import { TravelModule } from '../travel/travel.module';

@Module({
  imports: [HttpModule, TravelModule],
  providers: [CompanyService, CompanyResolver],
  exports: [CompanyService],
})
export class CompanyModule {}

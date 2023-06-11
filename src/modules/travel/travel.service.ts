import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Travel } from './travel.entity';
import { firstValueFrom } from 'rxjs';
import { EXTERNAL_API_TRAVEL } from '../../external/config.endpoint';
import { CompanyService } from '../company/company.service';

@Injectable()
export class TravelService {
  constructor(private httpService: HttpService) {}

  async getTravelData(): Promise<Travel[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Travel[]>(EXTERNAL_API_TRAVEL),
    );
    return data;
  }
}

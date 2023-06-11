import { Query, Resolver } from '@nestjs/graphql';
import { TravelService } from './travel.service';
import { Travel } from './travel.entity';
import { Company } from '../company/company.entity';

@Resolver((of) => Travel)
export class TravelResolver {
  constructor(private travelService: TravelService) {}

  @Query((returns) => [Travel])
  travels(): Promise<Travel[]> {
    return this.travelService.getTravelData();
  }
}

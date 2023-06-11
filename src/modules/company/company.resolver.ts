import { Query, Resolver } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './company.entity';

@Resolver((of) => Company)
export class CompanyResolver {
  constructor(private companyService: CompanyService) {}

  @Query((returns) => [Company])
  companies(): Promise<Company[]> {
    return this.companyService.getCompanyData();
  }

  @Query((returns) => [Company])
  nest(): Promise<Company[]> {
    return this.companyService.nestedCompany();
  }

  @Query((returns) => [Company])
  travelCost(): Promise<Company[]> {
    return this.companyService.travelCost();
  }
}

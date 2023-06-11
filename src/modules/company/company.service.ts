import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EXTERNAL_API_COMPANY } from '../../external/config.endpoint';
import { Company } from './company.entity';
import { TravelService } from '../travel/travel.service';

@Injectable()
export class CompanyService {
  constructor(
    private httpService: HttpService,
    private travelService: TravelService,
  ) {}

  async getCompanyData(): Promise<Company[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Company[]>(EXTERNAL_API_COMPANY),
    );
    return data;
  }

  async companyTravelCost(): Promise<Company[]> {
    const companies = await this.getCompanyData();
    const travels = await this.travelService.getTravelData();

    for (const company of companies) {
      let cost = 0;
      for (const travel of travels) {
        if (company.id === travel.companyId) {
          cost += Number(travel.price);
        }
      }
      company.cost = cost;
    }

    return companies;
  }

  async nestedCompany(): Promise<Company[]> {
    const companies = await this.companyTravelCost();
    const companyMap = new Map<string, Company>();

    for (const company of companies) {
      companyMap.set(company.id, company);
    }

    for (const company of companies) {
      company.children = [];
      if (company.parentId !== '0') {
        const parentCompany = companyMap.get(company.parentId);
        if (parentCompany) {
          parentCompany.children?.push(company);
        }
      }
    }

    return companies.filter((company) => company.parentId === '0');
  }

  calculateTotalTravelCost(company: Company): number {
    let totalCost = company.cost;
    if (company.children.length > 0) {
      for (const child of company.children) {
        totalCost += this.calculateTotalTravelCost(child);
      }
    }
    company.cost = totalCost;
    return totalCost;
  }

  async travelCost() {
    const companies = await this.nestedCompany();
    for (const company of companies) {
      this.calculateTotalTravelCost(company);
    }

    return companies;
  }
}

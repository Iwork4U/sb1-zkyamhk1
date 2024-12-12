import { DomainService } from './domainService.js';
import { SearchVolumeService } from './searchVolumeService.js';
import { CPAService } from './cpaService.js';

export class AppraisalService {
  constructor() {
    this.domainService = new DomainService();
    this.searchVolumeService = new SearchVolumeService();
    this.cpaService = new CPAService();
  }

  async getFullAppraisal(domain) {
    const [appraisal, searchVolume] = await Promise.all([
      this.domainService.appraiseDomain(domain),
      this.searchVolumeService.getSearchVolume(domain)
    ]);

    const cpaValue = await this.cpaService.getCPAValue(domain, searchVolume);

    return {
      domain,
      appraisalValue: `${appraisal.price} ${appraisal.currency}`,
      searchVolume: searchVolume.searchVolume,
      cpaValue: cpaValue.cpaValue
    };
  }
}
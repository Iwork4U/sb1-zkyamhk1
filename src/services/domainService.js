import fetch from 'node-fetch';
import { GODADDY_API_CONFIG } from '../config/godaddy.js';
import { AppError } from '../utils/errorHandler.js';

export class DomainService {
  async appraiseDomain(domain) {
    try {
      const response = await fetch(
        `${GODADDY_API_CONFIG.baseUrl}/appraisal/${domain}`,
        {
          method: 'GET',
          headers: GODADDY_API_CONFIG.headers
        }
      );

      if (!response.ok) {
        throw new AppError(`Failed to appraise domain: ${response.statusText}`, response.status);
      }

      const data = await response.json();
      return {
        domain,
        price: data.price || 0,
        currency: data.currency || 'USD'
      };
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(`Error appraising domain ${domain}: ${error.message}`);
    }
  }

  async getSearchVolume(domain) {
    try {
      // Placeholder for SEO API integration
      return {
        domain,
        searchVolume: 'API integration required'
      };
    } catch (error) {
      throw new AppError(`Error getting search volume for ${domain}: ${error.message}`);
    }
  }
}
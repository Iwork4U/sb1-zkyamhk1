import { isDomainValid, parseDomainList } from '../utils/validators.js';
import { AppError } from '../utils/errorHandler.js';

export const validateDomains = (req, res, next) => {
  try {
    let domains = [];

    if (req.file) {
      const content = req.file.buffer.toString();
      domains = parseDomainList(content);
    } else if (req.body.domains) {
      domains = Array.isArray(req.body.domains)
        ? req.body.domains
        : parseDomainList(req.body.domains);
    }

    const validDomains = domains.filter(isDomainValid);

    if (validDomains.length === 0) {
      throw new AppError('No valid domains provided', 400);
    }

    req.validDomains = validDomains;
    next();
  } catch (error) {
    next(error);
  }
};
import express from 'express';
import { fileUploadMiddleware } from '../middleware/fileUpload.js';
import { validateDomains } from '../middleware/validation.js';
import { AppraisalService } from '../services/appraisalService.js';
import { asyncHandler } from '../utils/errorHandler.js';

export const appraisalRouter = express.Router();
const appraisalService = new AppraisalService();

appraisalRouter.post('/bulk', 
  fileUploadMiddleware,
  validateDomains,
  asyncHandler(async (req, res) => {
    const results = await Promise.all(
      req.validDomains.map(domain => appraisalService.getFullAppraisal(domain))
    );

    res.json({
      status: 'success',
      count: results.length,
      results
    });
  })
);
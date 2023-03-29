import { OpportunityType, Prisma } from '@prisma/client';
import { excludedFields } from 'src/helper/helper.service';

export class OpportunityInput
  implements
    Omit<Prisma.OpportunityUncheckedCreateInput, excludedFields | 'collegeId'>
{
  name: string;
  description: string;
  link: string;
  deadline: Date;
  tags: string[];
  url: string;
  companyImage: string;
  linkedin: string;
  jobDesc: string;
  type: OpportunityType = OpportunityType.FULL_TIME;
}

export class ApplicationInput {
  opportunityId: string;
}

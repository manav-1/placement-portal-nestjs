import { Opportunity, Prisma } from '@prisma/client';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Helper } from '../../helper/helper.service';
import { OpportunitySelector } from './dto/opportunity.dto';

@Injectable()
export class OpportunityService {
  constructor(private prisma: PrismaService, private helper: Helper) {}

  async getAllOpportunities(): Promise<Opportunity[]> {
    const { collegeId, id: userId } = this.helper.getToken();
    const { streamId } = await this.prisma.userProfile.findUnique({
      where: {
        userId,
      },
      select: {
        streamId: true,
      },
    });

    if (!streamId)
      throw new NotFoundException('No stream found for this user!');

    return await this.prisma.opportunity.findMany({
      where: {
        collegeId,
        OpportunityStreamLink: {
          every: {
            streamId: streamId,
          },
        },
      },
    });
  }

  async addOpportunity(body: Prisma.OpportunityUncheckedCreateInput) {
    const addedOpportunity = await this.prisma.opportunity.create({
      data: body,
    });
    return addedOpportunity;
  }
  async applyOpportunity(body: OpportunitySelector) {
    const { opportunityId } = body;
    const { id: userId } = this.helper.getToken();
    const data = await this.prisma.opportunityUserLink.create({
      data: {
        opportunityId,
        userId,
      },
      include: {
        opportunity: true,
        user: {
          include: {
            userProfile: true,
          },
        },
      },
    });
    if (data && data.id) {
      return data;
    }
    throw new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'An error occurred while applying for the opportunity',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async deleteOpportunity(params: OpportunitySelector) {
    const { opportunityId } = params;
    const { collegeId } = this.helper.getToken();
    const opportunity = await this.prisma.opportunity.findUnique({
      where: {
        id_collegeId: {
          collegeId: collegeId,
          id: opportunityId,
        },
      },
    });
    if (!opportunity) {
      throw new NotFoundException('Opportunity not found.');
    }
    const data = await this.prisma.opportunity.delete({
      where: {
        id_collegeId: {
          collegeId: collegeId,
          id: opportunityId,
        },
      },
    });
    return data;
  }

  // generate report for a specific opportunity, if available using excelJs and send it back to client
  async generateReport(params: OpportunitySelector) {
    const { opportunityId } = params;
    const { collegeId } = this.helper.getToken();
    const opportunity = await this.prisma.opportunity.findUnique({
      where: {
        id_collegeId: {
          collegeId: collegeId,
          id: opportunityId,
        },
      },
    });
    if (!opportunity) {
      throw new NotFoundException('Opportunity not found.');
    }
    const links = await this.prisma.opportunityUserLink.findMany({
      where: {
        opportunityId,
      },
      include: {
        opportunity: true,
        user: {
          include: {
            userProfile: true,
          },
        },
      },
    });

    if (!links || !links.length) {
      throw new NotFoundException('No users found for this opportunity.');
    }

    return links;
  }

  async getAppliedOpportunities() {
    const { id: userId } = this.helper.getToken();
    const links = await this.prisma.opportunityUserLink.findMany({
      where: {
        userId,
      },
      include: {
        opportunity: true,
        user: {
          include: {
            userProfile: true,
          },
        },
      },
    });

    if (!links || !links.length) {
      throw new NotFoundException('No users found for this opportunity.');
    }

    return links;
  }
}

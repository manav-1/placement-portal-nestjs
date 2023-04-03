import { PartialType } from '@nestjs/swagger';
import { CreateCollegeAdminDto } from './create-college-admin.dto';

export class UpdateCollegeAdminDto extends PartialType(CreateCollegeAdminDto) {}

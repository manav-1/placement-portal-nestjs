import { Injectable } from '@nestjs/common';
import { CreateCollegeAdminDto } from './dto/create-college-admin.dto';
import { UpdateCollegeAdminDto } from './dto/update-college-admin.dto';

@Injectable()
export class CollegeAdminService {
  create(createCollegeAdminDto: CreateCollegeAdminDto) {
    return 'This action adds a new collegeAdmin';
  }

  findAll() {
    return `This action returns all collegeAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} collegeAdmin`;
  }

  update(id: number, updateCollegeAdminDto: UpdateCollegeAdminDto) {
    return `This action updates a #${id} collegeAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} collegeAdmin`;
  }
}

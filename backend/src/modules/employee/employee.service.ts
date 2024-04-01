import { BadRequestException, Delete, Injectable } from '@nestjs/common';
import { Employee } from './entity/Employee';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Showroom } from '../showroom/entity/Showroom';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepo: Repository<Employee>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>
    ){}

    async addEmployee(createEmployeeDto:CreateEmployeeDto, showroomId: number):Promise<Employee>{
        const { employeeCnic, employeeEmail, employeeName, employeePhoneNo, employeePosition, shiftTime, employeeSalary, joiningDate, totalLeaves } = createEmployeeDto;
        const employee = new Employee();
        employee.employee_cnic = employeeCnic;
        employee.employee_email = employeeEmail;
        employee.employee_name = employeeName;
        employee.employee_phone_no = employeePhoneNo;
        employee.employee_position = employeePosition;
        employee.employee_salary = employeeSalary;
        employee.joining_date = joiningDate;
        employee.shift_time = shiftTime;
        employee.total_leaves = totalLeaves;
        employee.showroom = await this.showroomRepository.findOneBy({showroom_id:showroomId});
        return await this.employeeRepo.save(employee);
    }

    async getEmployees(showroomId:number): Promise<Employee[]>{
        return await this.employeeRepo.findBy({showroom: {showroom_id:showroomId}})
    }

    async deleteEmployee(employeeId: number): Promise<DeleteResult>{
        try{
     return await this.employeeRepo.delete({employee_id: employeeId})
        } catch(e){
            throw new BadRequestException('This employee can not be deleted');
        }
    }
    
}

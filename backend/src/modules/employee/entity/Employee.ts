import { Account } from "src/modules/account/entity/Account";
import { User } from "src/modules/auth/entity/User";
import { Showroom } from "src/modules/showroom/entity/Showroom";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { EmployeePerformance } from "../employee-performance.enum";

@Entity({ name: 'employee'})
@Unique(['employee_cnic','employee_phone_no',])
export class Employee{

    @PrimaryGeneratedColumn()
    employee_id: number;
    
    @Column()
    employee_name: string;

    @Column()
    employee_cnic: string;

    @Column()
    employee_position: string;

    @Column()
    employee_status: string;

    @Column()
    employee_phone_no: string;

    @Column({ nullable:true })
    employee_email: string;

    @Column()
    employee_salary: number;

    @Column()
    joining_date: Date;

    @Column()
    Termination_date: Date;

    @Column()
    shift_time: string;

    @Column()
    bonus: number;

    @Column()
    total_leaves: number;

    @Column()
    available_leaves: number;

    @Column()
    performance: EmployeePerformance;

    @ManyToOne(() => Showroom, (showroom) => showroom.employees)
    showroom: Showroom;

    @OneToOne( () =>  Account, (account) =>  account.employee)
    account : Account;

    @OneToOne(() => User, (user) => user )
    user: User;
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { VehicleTypeDto } from './dto/vehicle-type.dto';
import { VehicleTypeAttributeService } from '../vehicle-type-attribute/vehicle-type-attribute.service';
import { VehicleType } from './entity/Vehicle-type';
import { VehicleTypeAttribute } from '../vehicle-type-attribute/entity/Vehicle-type-attribute';
import { MultiValueAttribute } from '../multi-value-attribute/entity/Multi-value-attribute';
import { Showroom } from '../showroom/entity/Showroom';

@Injectable()
export class VehicleTypeService {

    constructor(
        @InjectRepository(VehicleType)
        private vehicleTypeRepository: Repository<VehicleType>,
        @InjectRepository(VehicleTypeAttribute)
        private vehicleTypeAttributeRepository: Repository<VehicleTypeAttribute>,
        @InjectRepository(MultiValueAttribute)
        private multiValueAttributeRepository: Repository<MultiValueAttribute>,
        @InjectRepository(Showroom)
        private showroomRepository: Repository<Showroom>,
    ){}

    async addVehicleType (vehicleTypeDto: VehicleTypeDto): Promise<VehicleType>{
        const vehicleType = new VehicleType();
        const {vehicleTypeName, showroomId} = vehicleTypeDto;
        // let showRoomData = await this.showroomRepository.findOne({where:{showroom_id:showroomId}});
        if ( await this.vehicleTypeRepository.exist({ where: { type_name: vehicleTypeName, showroom: { showroom_id: showroomId }} }) == false ){
        vehicleType.type_name = vehicleTypeName;
        vehicleType.showroom = await this.showroomRepository.findOne({ where: { showroom_id: showroomId } });
        await this.vehicleTypeRepository.save(vehicleType);
        }
        return vehicleType;
    }

    async getVehicleType (showroomId: number): Promise<VehicleType[]>
    {

        // const showroomObj = await this.showroomRepository.findOne({ where: { showroom_id: showroomId } });
        return await this.vehicleTypeRepository.find({ where: { showroom: { showroom_id: showroomId  } }});
                            
    }

    async deleteVehicleType (vehicleTypeId: number){
        const getRecord =await this.vehicleTypeRepository.createQueryBuilder('vehicleType')
        .select('*')
        .where('vehicleType.type_id = :vehicleTypeId',{ vehicleTypeId })
        .getRawOne();
        this.multiValueAttributeRepository.delete( {vehicleTypeAttribute: Equal(await this.vehicleTypeAttributeRepository.findOne({ where: { vehicleType: getRecord } }))});
        this.vehicleTypeAttributeRepository.delete({vehicleType:getRecord});
        return this.vehicleTypeRepository.delete({ type_id: vehicleTypeId});
    }

    // updateVehicleType (vehicleType: string){
    //     return this.vehicleTypeRepositry.update({ type_name: vehicleType });
    // }
}
 
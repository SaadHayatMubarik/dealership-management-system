import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { IVehicleTypeAttribute } from '../../interfaces/inventory';
import { ConfirmationService } from 'primeng/api';



import {
  DataTableColumn,
  IDataTableAction,
  IObject,
} from 'src/app/shared/interfaces/common';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';

@Component({
  selector: 'app-vehicle-type-attributes',
  templateUrl: './vehicle-type-attributes.component.html',
  styleUrls: ['./vehicle-type-attributes.component.css']
})
export class VehicleTypeAttributesComponent  extends BaseComponent implements OnInit {


 
  vehicleTypeAttribute: IVehicleTypeAttribute = {
    vehicleAttributeName:'',
    attributeInputType:'',
    vehicleAttributeValue:[],
    vehicleType:''
  };


  vehicleTypes: any[] = [];
  selectedVehicleTypeAttributeName: any; //saving vehicle type attribute name
  
 
  // vehicleTypeinput: { label: string, value: number }[] = [];
  

  
  
  columns: DataTableColumn[] = [];
  actions: IDataTableAction[] = [];
  data: IObject[] = [];
  inputTypes: any[] = ['TEXT', 'NUMBER', 'DATE', 'DROPDOWN'];


 
  
  
  
  constructor(private confirmationService: ConfirmationService, private readonly apiService: ApiHelperService){
    super()
   
      
  }


  ngOnInit() 

  {
    this.getVehicleTypeAttribute();
    this.vehicleTypes= this.apiService.getVehicleTypes();
    

    

   this.columns = [ 
    {
      field: 'vehicleTypeName',
      fieldTitle: 'Vehicle Type Name',
    },
    {
        field: 'vehicleAttributeName',
        fieldTitle: 'Attribute Name',
      },
      {
        field: 'vehicleAttributeValue',
        fieldTitle: 'Attribute Value',
      },
      {
        field: 'attributeInputType',
        fieldTitle: 'Input Type',
      },
    
    ];
    this.actions = [
      {
        label: ' Delete',
        icon: 'pi pi-trash',
        command: (event) => {
          this.selectedVehicleTypeAttributeName = event.vehicleAttributeName;
          console.log(this.selectedVehicleTypeAttributeName);
            this.apiService.delete(`/vehicle-type-attribute/${this.selectedVehicleTypeAttributeName }`).subscribe(
            (response) => {
              console.log(`Attribute ${this.selectedVehicleTypeAttributeName } deleted.`);
            });
        },
      },  
      // {
      //   label: ' Delete',
      //   icon: 'pi pi-trash',
      //   command: (event) => {
      //     this.selectedVehicleTypeAttributeName = event.vehicleAttributeName;
      //     console.log(this.selectedVehicleTypeAttributeName);
      //     this.confirmationService.confirm({
      //       header: 'Confirmation',
      //       message: `Are you sure you want to delete ${this.selectedVehicleTypeAttributeName}?`,
      //       icon: 'pi pi-exclamation-triangle',
      //       accept: () => {
      //         // User confirmed, proceed with deletion
      //         this.apiService.delete(`/vehicle-type-attribute/${this.selectedVehicleTypeAttributeName}`).subscribe(
      //           (response) => {
                 
      //           },
      //           (error) => {
      //             console.error('Error deleting attribute:', error);
      //           }
      //         );
      //       }
      //     });
      //   },
      // },
      {
        label: 'Update',
        icon: 'pi pi-file-edit',
        command: () => {
          ;
        },
      },
    ];
  }

  
  resetForm() {
    this.vehicleTypeAttribute.vehicleAttributeName = "";
    this.vehicleTypeAttribute.attributeInputType = '';
    this.vehicleTypeAttribute.vehicleAttributeValue = [];
    this.vehicleTypeAttribute.vehicleType = '';
  }

  getVehicleTypeAttribute(){
    this.apiService.get('/vehicle-type-attribute/getVehicleAttribute').subscribe((data) => {
      this.data = data;
    });
  }
 
  saveVehicleTypeAttribute() {
    if (this.vehicleTypeAttribute.vehicleAttributeName !== '') {
      this.apiService
        .post('/vehicle-type-attribute/addVehicleTypeAttribute', this.vehicleTypeAttribute)
        .subscribe({
          next: (response) => {
            this.resetForm();
            this.closeModal();
            console.log("successs");
          },
          error: () => {
            console.log("unsucessful");
            
          },
       
        });
    }
  }



}






 




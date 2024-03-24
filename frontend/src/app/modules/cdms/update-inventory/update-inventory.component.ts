import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base.component';
import { NgForm } from '@angular/forms';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { ActivatedRoute } from '@angular/router';

import { ToastService } from 'src/app/shared/services/toast.service';

import { Router } from '@angular/router';

import { ISellInventory } from '../../interfaces/inventory';

import {
  IObject
} from 'src/app/shared/interfaces/common';
import { IUpdateInventory } from '../../interfaces/update';


@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.scss']
})
export class UpdateInventoryComponent extends BaseComponent implements OnInit {

  inventoryId : number = 0;
  showroomId = localStorage.getItem('showroom Id');

  status_option: string[] = ['AVAILABLE', 'ON ORDER'];
  


  constructor(private apiService:ApiHelperService, 
    private route: ActivatedRoute,
    private toast: ToastService,
    private router: Router){
   super();
 }

 ngOnInit()
  {
    this.route.params.subscribe(params => {
      this.inventoryId = params['inventoryId']; 
      // this.getvehicleDetail();
      this.getVehicleDetails(this.inventoryId);
      console.log(this.inventoryId);
    
    });
   
    };

      @ViewChild('vehicleUpdate') vehicleUpdate!: NgForm ;

      updateInventory: IUpdateInventory = 
      {
      make : '',
      model:'' ,
      variant: '',  
      chasis_no : '' ,
      engine_no : '',
      price : '',
      demand : '',
      year : '',
      color : '',
      status : ''  ,
      reg_no : ''  ,
      date_of_purchase:'',

      }

    
   
    // model : string = '' ;
    // variant : string = '' ;
    // chasisNo : string = '' ;
    // engineNo : string = '' ;
    // costPrice : string = '' ;
    // demand : string = '' ;
    // modelYear : string = '' ;
    // bodyColor : string = '' ;
    // status : string = '' ;
    // regNo : string = '' ;
    // dateOfPurchase: Date | null = null;
 
    // getvehicleDetail(){
    //   this.apiService
    // .get(`/inventory/getInventoryDetails/${this.inventoryId}`)
    // .subscribe(
    //   (data) => {
    //     this.vehicleDetails = data;
    //     console.log('vehicle details object', this.vehicleDetails);
      
    //     this.make = this.vehicleDetails.make
    //     this.model = this.vehicleDetails.model
    //     this.variant = this.vehicleDetails.variant
    //     this.chasisNo = this.vehicleDetails.chasis_no
    //     this.engineNo = this.vehicleDetails.engine_no
    //     this.costPrice = this.vehicleDetails.price
    //     this.dateOfPurchase = new Date(this.vehicleDetails.date_of_purchase);
    //     this.modelYear = this.vehicleDetails.year
    //     this.bodyColor = this.vehicleDetails.color
    //     this.status = this.vehicleDetails.status
    //     this.regNo = this.vehicleDetails.reg_no
    //     this.demand = this.vehicleDetails.demand
  
    //   }
    // );
    // }

    getVehicleDetails(inventoryId: number){

      this.apiService
      .get(`/inventory/getInventoryDetails/${inventoryId}`)
      .subscribe(
        (data: IUpdateInventory) => {
          this.updateInventory = data;
     
        }
      );

    }


    update(){
      this.apiService.put('/inventory/updateInventory/sellInventory', this.updateInventory).subscribe(
        next => {
        this.toast.showSuccess('Updated Successfully');
        console.log('success', next);
        console.log('object on success', this.updateInventory);
              },
      error => {
      this.toast.showError('Server Error! Please try again later.');
      console.log('Fail:', error);
      console.log('object on fail', this.updateInventory);
      },
    )


    }



  }



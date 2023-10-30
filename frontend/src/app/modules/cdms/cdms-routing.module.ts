import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleTypeComponent } from './vehicle-type/vehicle-type.component';
import { AddInventoryFormComponent } from './add-inventory-form/add-inventory-form.component';
import { VehicleTypeAttributesComponent } from './vehicle-type-attributes/vehicle-type-attributes.component';
import { LoginLayoutComponent } from 'src/app/shared/layout/login-layout/login-layout.component';
import { LoginComponent } from './login/login.component';
import { AppLayoutComponent } from 'src/app/shared/layout/app.layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignUpComponent } from './sign-up/sign-up.component';



const routes: Routes = [
  {
    path: '',
    component: LoginLayoutComponent, // Use the new layout component for login
    children: [
      {
        path: '',
        component: SignUpComponent,
      },
      {
        path: 'login',
        component: LoginComponent, 
      }
    ],
  },
  {
    path: '',
    component: AppLayoutComponent, // Use the new layout component for login
    children: [
      {
        path: 'dashboard',
        component:DashboardComponent
      }
      ,{
      path: 'vehicle-type', 
      component: VehicleTypeComponent,
    },
    {
      path:'vehicle-type-attributes', 
      component:VehicleTypeAttributesComponent,
    },
    {
      path:'add-inventory', 
      component:AddInventoryFormComponent,
    },
    ],
  }, 
  // {


  
  
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CdmsRoutingModule { }

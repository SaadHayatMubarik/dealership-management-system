import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiHelperService } from 'src/app/shared/services/api-helper.service';
import { Router } from "@angular/router";
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

    private tokenExpirationTimer : any;

    constructor(private http:HttpClient,
                private apiService:ApiHelperService,
                private router: Router,){}

    
    login(path: string, body: Object = {}): Observable<any> {
        return this.http
          .post(`${environment.apiUrl}${path}`, body)
          .pipe(this.apiService.hookResponse(this.apiService));
      }

    // login(path: string, body: Object = {}): Observable<any> {
    //   return this.http
    //     .post(`${environment.apiUrl}${path}`, body)
    //     .pipe(
    //       this.apiService.hookResponse(this.apiService),
    //       tap((response) => {
    //         const jwtToken = response.accessToken;
    //         const showroomId = response.showroom;
    //         const userRole = response.userRole; // Add this line to get the user's role
    //         localStorage.setItem('jwtToken', jwtToken);
    //         localStorage.setItem('Showroom Id', showroomId['showroomShowroomId']);
    //         localStorage.setItem('userRole', userRole); // Save the user's role
    //         this.autoLogout(3600);
    //       })
    //     );
    // }


      logout(){
        this.router.navigate(['/login']);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('Showroom Id');
        localStorage.removeItem('user Id')

        if (this.tokenExpirationTimer)
        {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      }

      autoLogout(expirationDuration : number){

       this.tokenExpirationTimer =  setTimeout(() => {
            this.logout();
        },expirationDuration);
      }
}
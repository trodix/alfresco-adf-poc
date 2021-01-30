import { AuthenticationService } from '@alfresco/adf-core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {

  constructor(private authService: AuthenticationService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  signOut(event: any): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}

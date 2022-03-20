import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string = "";
  error:string = "";
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  login(form: NgForm): any {
    // stop here if form is invalid
    if (form.invalid) {
      return false;
    }

    this.authenticationService.login(form.value.username, form.value.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data,this.returnUrl);
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error=error;
          setTimeout(()=>this.error='',2000);
          console.log(error);
        });
  }

}

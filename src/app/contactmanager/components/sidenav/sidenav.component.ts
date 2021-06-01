import { Direction } from '@angular/cdk/bidi';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isScreenSmall = false;

  users: Observable<User[]> | undefined;
  isDarkTheme: boolean = false;
  direction: Direction = 'ltr';

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private router: Router) { }

    @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = ! this.isDarkTheme;
  }

  toggleDir() {
    this.direction = this.direction == 'ltr' ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.breakpointObserver
      //.observe([ Breakpoints.XSmall])
      .observe([ `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });

      this.users = this.userService.users;
      this.userService.loadAll();

      this.router.events.subscribe(() => {
        if (this.isScreenSmall){
          this.sidenav.close();
        }
      });
  }

}

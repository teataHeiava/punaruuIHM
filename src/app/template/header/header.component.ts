import {Component, OnInit} from '@angular/core';
import {SectionService} from "../../services/http/section.service";
import {Section} from "../../domain/section";
import {AuthService, FacebookLoginProvider, SocialUser} from "angularx-social-login";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public sections: Section[];

  user: SocialUser;
  loggedIn: boolean;

  constructor(private sectionService: SectionService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  public signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  public signOut(): void {
    this.authService.signOut();
  }


}

import {Component, OnInit} from '@angular/core';
import {SocialUser} from 'angularx-social-login';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AuthentificationComponent} from '../../component/authentification/authentification.component';
import {AuthentificationService} from '../../services/http/authentification.service';
import {UtilisateurConnecte} from '../../domain/utilisateur-connecte';
import {SectionService} from '../../services/http/section.service';
import {Section} from '../../domain/section';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public utilisateurConnecte: UtilisateurConnecte;
  public sections: Array<Section> = [];

  constructor(private dialog: MatDialog, private authService: AuthentificationService,
              private sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.utilisateurConnecte = this.authService.getUtilisateurConnecte();
    this.authService._authenticatedSubject.subscribe(retour => {
      this.utilisateurConnecte = retour;

      if (retour != null) {
         this.sectionService.listerTous()
           .then( sections => {
             this.sections = sections;
           })
      }

    })
  }

  public login(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(AuthentificationComponent, dialogConfig);
  }

  public signOut(): void {
    this.authService.logout();
  }
}

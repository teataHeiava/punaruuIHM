import {Component, OnInit} from '@angular/core';
import {SocialUser} from 'angularx-social-login';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AuthentificationComponent} from '../../component/authentification/authentification.component';
import {AuthentificationService} from '../../services/http/authentification.service';
import {UtilisateurConnecte} from '../../domain/utilisateur-connecte';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public utilisateurConnecte: UtilisateurConnecte;

  constructor(private dialog: MatDialog, private authService: AuthentificationService) {
  }

  ngOnInit(): void {
    this.utilisateurConnecte = this.authService.getUtilisateurConnecte();
    this.authService._authenticatedSubject.subscribe(retour => {
      this.utilisateurConnecte = retour;
    })
  }

  public login(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(AuthentificationComponent, dialogConfig);
  }

  public signOut(): void {
    this.authService.logout();
  }
}

import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AuthentificationComponent} from '../../component/authentification/authentification.component';
import {AuthentificationService} from '../../services/http/authentification.service';
import {UtilisateurConnecte} from '../../domain/utilisateur-connecte';
import {SectionService} from '../../services/http/section.service';
import {Section} from '../../domain/section';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public utilisateurConnecte: UtilisateurConnecte;
  public sections: Array<Section> = [];

  constructor(private dialog: MatDialog, private authService: AuthentificationService,
              private sectionService: SectionService, private router: Router) {
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

  public accederFicheSection(discipline: string) {
    this.router.navigate(['/section/' + discipline]);
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

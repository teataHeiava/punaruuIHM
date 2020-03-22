import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthentificationService} from '../../services/http/authentification.service';
import {UtilisateurConnecte} from '../../domain/utilisateur-connecte';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  public authForm: FormGroup;
  public isConnecte: boolean = false;
  public cacherMotPasse: boolean = true;

  constructor(private formBuilder: FormBuilder, private authentificationService: AuthentificationService,
              private modalAuth: MatDialogRef<AuthentificationComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.authForm = this.formBuilder.group({
      identifiant: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  public async login() {
    const retour = await this.authentificationService.login(this.authForm.get('identifiant').value, this.authForm.get('password').value);
    if (retour == 0) {
      alert('Vous êtes déjà authentifier, veuillez vous déconnecter');

    }
    if (retour == -1) {
      alert('Utilisateur inconnu');
    }
    this.modalAuth.close();
  }

  /**
   * Permet de fermer la popup
   */
  public fermer(): void {
    this.modalAuth.close();
  }

}

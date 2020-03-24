import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SectionService} from '../../services/http/section.service';
import {Section} from '../../domain/section';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthentificationService} from '../../services/http/authentification.service';
import {UtilisateurConnecte} from '../../domain/utilisateur-connecte';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  public formulaireSection: FormGroup;
  public section: Section;
  private accesModif: boolean = false;

  constructor(private activeRoute: ActivatedRoute, private sectionService: SectionService,
              private router: Router, private formBuilder: FormBuilder,
              private authService: AuthentificationService) {
  }

  private utilisateurConnecte: UtilisateurConnecte;

  ngOnInit(): void {
    this.utilisateurConnecte = this.authService.getUtilisateurConnecte();

    if (this.activeRoute.snapshot.params['discipline']) {
      this.trouverSection();
    } else {
      this.router.navigate(['/']);
    }

    this.activeRoute.params.subscribe(valeur => {
      this.trouverSection();
    })
  }

  private trouverSection() {
    this.sectionService.trouver(this.activeRoute.snapshot.params['discipline'])
      .then(retour => {
        this.section = retour;
        if (this.utilisateurConnecte.dirigeant.section.code == this.section.code) {
          this.accesModif = true;
        } else {
          this.accesModif = false;
        }
        this.initFormulaire();
        this.formulaireSection.patchValue(retour);
      })
  }

  private initFormulaire() {
    this.formulaireSection = this.formBuilder.group({
      id: new FormControl({value: '', disabled: true}, Validators.required),
      nom: new FormControl({value: '', disabled: !this.accesModif}, Validators.required),
      dateValidationCatp: new FormControl({value: '', disabled: !this.accesModif}, Validators.required),
      discipline: new FormControl({value: '', disabled: !this.accesModif}, Validators.required),
      typeCalendrier: new FormControl({value: '', disabled: !this.accesModif}, Validators.required),
      code: new FormControl({value: '', disabled: !this.accesModif}, Validators.required),
      version: new FormControl({value: '', disabled: true}, Validators.required)
    })
  }
}

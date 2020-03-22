import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {UtilisateurConnecte} from '../../domain/utilisateur-connecte';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  public _authenticatedSubject = new BehaviorSubject<UtilisateurConnecte>(null);
  private sessionUrl = 'http://localhost:8080/authenticate';
  private httpHeader = new HttpHeaders({'Content-Type': 'application/json;charset=UTF-8'});

  constructor(private http: HttpClient) {
    const userCurrent: UtilisateurConnecte = JSON.parse(sessionStorage.getItem('utilisateurConnecte'));
    this._authenticatedSubject.next(userCurrent);
  }

  private loginAPI(identifiant: String, password: String): Promise<any> {

    const authHeader = 'Basic ' + btoa(identifiant + ':' + password);

    return this.http.post(this.sessionUrl, null, {headers: this.httpHeader.set('Authorization', authHeader)}).toPromise();
  }

  public async login(identifiant: String, password: String): number {
    if (this._authenticatedSubject.value != null) {
      return 0;
    }

    await this.loginAPI(identifiant, password)
      .then(retour => {
        let utilisateurConnecte: UtilisateurConnecte = retour;
        console.log('retour API', retour);
        sessionStorage.setItem('utilisateurConnecte', JSON.stringify(utilisateurConnecte));
        this._authenticatedSubject.next(utilisateurConnecte);
        return 1;

      })
      .catch(error => {
        this._authenticatedSubject.next(null);
        sessionStorage.clear();
        return -1;
      })
  }

  /**
   * ramène l'utilisateur connecté
   */
  public getUtilisateurConnecte(): UtilisateurConnecte {
    const userCurrent: UtilisateurConnecte = JSON.parse(sessionStorage.getItem('utilisateurConnecte'));
    return userCurrent;
  }

  public logout() {
    this._authenticatedSubject.next(null);
    sessionStorage.clear();
  }
}

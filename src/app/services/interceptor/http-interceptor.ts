import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UtilisateurConnecte} from '../../domain/utilisateur-connecte';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptor implements HttpInterceptor {

  private authentificationUrl: string = 'http://localhost:8080/authenticate';

  public constructor() {
  }

  /**
   * Permet d'intercepter le retour de l'authentification pour gérer l'utilisateur
   * @param requete
   * @param next
   */
  public intercept(requete: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Si un utilisateur est loggé, on ajoute dans l'en-tête son tocken d'accès

    if (!requete.url.includes(this.authentificationUrl)) {
      const userCurrent: UtilisateurConnecte = JSON.parse(sessionStorage.getItem('utilisateurConnecte'));
      const token = userCurrent.token;

      if (token) {

        requete = requete.clone({
          setHeaders: {
            Authorization: 'Bearer ' + token}
        });
      }
    }
    return next.handle(requete);
  }

}

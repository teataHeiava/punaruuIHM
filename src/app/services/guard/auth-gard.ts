import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UtilisateurConnecte} from '../../domain/utilisateur-connecte';

@Injectable({
  providedIn: 'root'
})
export class AuthGard implements CanActivate {

  constructor() {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userCurrent: UtilisateurConnecte = JSON.parse(sessionStorage.getItem('utilisateurConnecte'));

    return !!userCurrent;
  }
}

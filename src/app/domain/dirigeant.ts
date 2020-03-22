import {Section} from './section';
import {Commune} from './commune';

export class Dirigeant {

  public id: number;

  public nom: string;

  public prenom: string;

  public telehoneFixe: string;

  public telephonePortable: string;

  public  dateNaissance: Date;

  public commune: Commune;

  public adresseGeographique: string;

  public version: Date;

  public fonction: string;

  public identifiant: string;

  public dateFin: Date;

  public bureauId: number;

  public section: Section;
}

export class CategoryModel {
  id!: number;
  nom!: string;
  created_at?: Date;
  updated_at?: Date;

  constructor(id: number = 0, nom: string = '') {
    this.id = id;
    this.nom = nom;
  }
}

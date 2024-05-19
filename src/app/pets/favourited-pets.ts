export class FavouritedPets {
  userId = '';
  petId = 0;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
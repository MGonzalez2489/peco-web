import { MatPaginatorIntl } from '@angular/material/paginator';

export class PecoPaginatorIntl extends MatPaginatorIntl {
  constructor() {
    super();
    this.itemsPerPageLabel = 'Items por pagina';
  }
}

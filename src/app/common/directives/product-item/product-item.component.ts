import Product from '../../../models/Product';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  public domain = document.location.protocol + '//' + document.location.hostname;
  constructor(private router: Router) {}

  ngOnInit() {}

  redirectToContactPage(product) {
    let url ;
    url = this.domain + '/products/' + product.getSlug();
    this.router.navigate(['/', 'contact'], { queryParams: { url } });
  }
}

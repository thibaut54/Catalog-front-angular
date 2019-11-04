import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CatalogService} from '../../service/catalog.service';
import {Router} from '@angular/router';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';
import {Product} from '../../domain/product';
import {SelectionModel} from '@angular/cdk/collections';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements AfterViewInit {

  productSubject = new Subject< Product[] >();
  product: Product[] = [];
  selectedProductId: number[] = [];
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['select', 'id', 'label', 'description', 'price', 'vatRate'];
  currentPage = 0;
  selection = new SelectionModel<Product>(true, []);
  data = Object.assign( this.product );
  motCle = '';
  length = 5;
  pages: Array<number>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor( public catalogService: CatalogService, public router: Router, public dialog: MatDialog ) {
    this.doSearch();
  }


  ngAfterViewInit() {
    this.doSearch();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  emitProductSubject(): void {
    this.productSubject.next(this.product);
  }

  doSearch() {
    console.log( 'fonction doSearch...' );
    this.catalogService.getProductList()
      .subscribe( data => {
        this.product = data;
        this.emitProductSubject();
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        // this.pages = new Array( data['totalPages'] )
      }, err => {
        console.log( err );
      } );
  }

  chercher() {
    this.doSearch();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  gotoPage(i: number) {
    this.currentPage = i;
    this.doSearch();
  }

  onEditContact( id: number ) {
    this.router.navigate(['editContact', id]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      // const index: number = this.data.findIndex(d => d === item);
      // console.log(this.data.findIndex(d => d === item));
      // this.data.splice(index, 1);
      // this.dataSource = new MatTableDataSource<Product>(this.data);
      this.selectedProductId.push(item.id);
    });
    // this.catalogService.deleteProductList(this.selectedProductId);
    this.catalogService.deleteProductListWithBody(this.selectedProductId);
    // this.selection = new SelectionModel<Product>(true, []);
    this.selection.clear();
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel('Confirm Action', message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
    });
  }
}

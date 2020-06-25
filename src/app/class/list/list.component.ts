import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClassService } from 'src/app/services/class.service';
import { Router } from '@angular/router';

export interface ClassData {
  id: number;
  code: string;
  name: string;
  maximum_students: string;
  status: boolean;
  description: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<ClassData>;
  displayedColumns: string[] = ['code', 'name', 'maximum_students', 'status', 'description', 'actions'];

  constructor(
    private classService: ClassService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getAllClass();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllClass() {
    this.classService.getAllClass().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
    });
  }

  public delete(id): void {

  }
}

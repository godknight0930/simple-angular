import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

export interface ClassData {
  id: number;
  first_name: string;
  last_name: string;
  class: string;
  date_of_birth: Date;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['first name', 'last name', 'class', 'date of birth', 'actions'];

  constructor(
    private studentService: StudentService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getAllStudent();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getAllStudent() {
    this.studentService.getAllStudent().subscribe((res) => {
      this.dataSource = res;
      console.log(res);
    });
  }



  public delete(id): void {

  }

}

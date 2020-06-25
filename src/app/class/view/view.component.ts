import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/app/services/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  code: string;
  name: string;
  maximum_students: string;
  status: boolean;
  description: string;

  constructor(
    public classService: ClassService,
    public router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url;
    const id = url.replace('/class/view/', '');
    this.getClassDetail(id);
  }

  public getClassDetail(id) {
    this.classService.getClassDetail(id).subscribe((res) => {
      console.log(res);
      this.code = res.code;
      this.name = res.name;
      this.maximum_students = res.maximum_students;
      this.description = res.description;
      if (res.status === 1) {
        this.status = true;
      } else {
        this.status = false;
      }
    })
  }

}

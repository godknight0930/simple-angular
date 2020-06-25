import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  class_form: FormGroup;
  ID: number;
  code: string;
  name: string;
  maximum_students: string;
  status: boolean;
  description: string;

  constructor(
    public formBuilder: FormBuilder,
    public classService: ClassService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    const url = this.router.url;
    const id = url.replace('/class/edit/', '');
    this.getClassDetail(id);
  }

  public getClassDetail(id) {
    this.classService.getClassDetail(id).subscribe((res) => {
      console.log("editable data", res);
      this.ID = res.id;
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

  public editClass() {
    let formData = {
      id: this.ID,
      code: this.code,
      name: this.name,
      maximum_students: this.maximum_students,
      description: this.description
    }
    this.classService.updateClass(formData).subscribe((res) => {
      if (res === 'Added Successfully') {
        this.router.navigate(['/class/list']);
      }
    })
  }

}

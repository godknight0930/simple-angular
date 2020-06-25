import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  classes: [];
  ID: number;
  birthTime: Date;
  student_form: FormGroup;
  first_name: string;
  last_name: string;
  public class: number;
  public date_of_birth: Date;

  constructor(
    public formBuilder: FormBuilder,
    public studentService: StudentService,
    private classService: ClassService,
    public router: Router
  ) {
    this.student_form = this.formBuilder.group({
      first_name: '',
      last_name: '',
      class: '',
    });
  }

  ngOnInit(): void {
    const url = this.router.url;
    const id = url.replace('/student/edit/', '');
    this.getStudentDetail(id);
    this.getAllClass();
  }

  public getAllClass() {
    this.classService.getAllClass().subscribe((res) => {
      this.classes = res;
      console.log(res);
    });
  }

  public editStudent() {
    const formData = {
      id: this.ID,
      first_name: this.first_name,
      last_name: this.last_name,
      class: this.class,
      date_of_birth: this.birthTime
    }

    console.log('formData', formData);
    this.studentService.updateStudent(formData).subscribe((res) => {
      if (res === 'Added Successfully') {
        this.router.navigate(['/student/list']);
      }
    })
  }

  public getStudentDetail(id) {
    this.studentService.getStudentDetail(id).subscribe((res) => {
      console.log("editable student", res);
      this.ID = res.id;
      this.first_name = res.first_name;
      this.last_name = res.last_name;
      this.class = parseInt(res.class);
      this.date_of_birth = new Date(res.date_of_birth);
      console.log('this.date_of_birth ', this.date_of_birth);
    })
  }


  public birth(event) {
    this.birthTime = event.toString();
    console.log('birthTime', event);
  }


}

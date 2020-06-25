import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  classes: [];
  birthTime: '';
  student_form: FormGroup;

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
    this.student_form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      class: ['', Validators.required],
    });
    this.getAllClass();
  }

  public getAllClass() {
    this.classService.getAllClass().subscribe((res) => {
      this.classes = res;
      console.log(res);
    });
  }

  public addStudent() {
    console.log(this.student_form.value);
    this.studentService.addStudent(this.student_form, this.birthTime).subscribe((res) => {
      if (res === 'Added Successfully') {
        this.router.navigate(['/student/list']);
      }
    })
  }

  public birth(event) {
    this.birthTime = event;
  }

}

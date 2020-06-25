import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  class_form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public classService: ClassService,
    public router: Router
  ) {
    this.class_form = this.formBuilder.group({
      code: '',
      name: '',
      maximum_students: null,
      status: false,
      description: '',
    });
  }

  ngOnInit(): void {
    this.class_form = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      maximum_students: [null, Validators.required],
      status: [false, Validators.required],
      description: '',
    });
  }

  public addClass() {
    console.log(this.class_form.value);
    this.classService.addClass(this.class_form).subscribe((res) => {
      if (res === 'Added Successfully') {
        this.router.navigate(['/class/list']);
      }
    })
  }
}

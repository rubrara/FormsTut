import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Forms';

  genders = ['male', 'female'];
  signupForm: FormGroup | any;
  forbidenUsernames = ['koki', 'roki'];

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      gender: 'female',
    });
  }

  onAddHoby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbidenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null as any;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });

    return promise;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('', [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl('', [Validators.email, Validators.required]),
      }),
      gender: new FormControl('male'),
      password: new FormControl('', [
        Validators.minLength(5),
        Validators.required,
      ]),
      hobbies: new FormArray([]),
    });

    // this.signupForm.valueChanges.subscribe((value: any) => console.log(value));
    this.signupForm.statusChanges.subscribe((status: any) =>
      console.log(status)
    );

    this.signupForm.setValue({
      userData: {
        username: 'Max',
        email: 'max@test.com',
      },
      password: 'noway',
      gender: 'male',
      hobbies: [],
    });

    this.signupForm.patchValue({
      userData: {
        username: 'Ana',
      },
    });
  }

  // @ViewChild('f') signupForm: NgForm | undefined;
  // defaultQuestion = 'pet';
  // answer = '';
  // genders = ['male', 'female'];
  // submitted = false;
  // user = {
  //   username: '',
  //   email: '',
  //   secretQuestion: '',
  //   answer: '',
  //   gender: '',
  // };

  // sugestUsername() {
  //   const suggestedName = 'Superuser';
  //   // this.signupForm.setValue({
  //   //   userData: {
  //   //     username: suggestedName,
  //   //     email: '',
  //   //     password: '',
  //   //   },
  //   //   secret: 'teacher',
  //   //   questionAnswer: '',
  //   //   gender: 'male',
  //   // });
  //   this.signupForm?.form.patchValue({
  //     userData: {
  //       username: suggestedName,
  //     },
  //   });
  // }

  // onSubmit() {
  //   this.user.username = this.signupForm?.value.userData.username;
  //   this.user.email = this.signupForm?.value.userData.email;
  //   this.user.secretQuestion = this.signupForm?.value.secret;
  //   this.user.gender = this.signupForm?.value.gender;
  //   this.user.answer = this.signupForm?.value.questionAnswer;
  //   this.submitted = true;

  //   this.signupForm?.reset();
  // }
}

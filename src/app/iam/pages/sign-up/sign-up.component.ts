import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";
import { SignUpRequest } from "../../model/sign-up.request";
import { BaseFormComponent } from "../../../shared/components/base-form.component";
import { SignInInfo } from '../../model/sign-in-info';
import { StorageService } from "../../../shared/services/storage.service"; // Import StorageService

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'] // Corrected styleUrl to styleUrls
})
export class SignUpComponent extends BaseFormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  image: string | null = null; // Variable to hold the uploaded image URL
  selectedFileName: string = ''; // To track the selected file name

  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService // Inject StorageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Added email validation
      phoneNumber: ['', Validators.required],
      photo: ['', Validators.required]
    });
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFileName = file.name;
      let reader = new FileReader();
      let name = "USER_PROFILE_" + Date.now(); // Unique name for the image
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.storageService.uploadFile(name, reader.result).then((url) => {
          this.image = url; // Save the uploaded image URL
          this.form.patchValue({ photo: this.image }); // Update the form control with the image URL
        }).catch((error) => {
          console.error('Error uploading image:', error);
        });
      };
    }
  }

  onSubmit() {
    if (this.form.invalid || !this.image) return; // Ensure form is valid and image is uploaded

    const signUpRequest = new SignUpRequest(this.form.value.username, this.form.value.password);
    const signInInfo: SignInInfo = new SignInInfo(
      this.form.value.firstName,
      this.form.value.lastName,
      this.form.value.phoneNumber,
      this.image, // Use the uploaded image URL
      this.form.value.email
    );

    this.authenticationService.signUp(signUpRequest, signInInfo);
    this.submitted = true;
  }
}

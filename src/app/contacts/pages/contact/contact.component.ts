import { Component, OnInit } from '@angular/core';
import { ContactService } from "../../services/contact.service";
import { AuthenticationService } from "../../../iam/services/authentication.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {StorageService} from "../../../shared/services/storage.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public userProfile: any | null = null;
  form!: FormGroup;
  public isEditing: boolean = false;
  public userId: number | undefined;
  image: string | null = null; // Variable to hold the uploaded image URL
  selectedFileName: string = '';


  constructor(
    private contactService: ContactService,
    private authService: AuthenticationService,
    private fb: FormBuilder,
    private storageService: StorageService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      photo: ['']
    });
  }


  getUserDetails() {
    this.authService.currentUserId.subscribe((userId: any) => {
      if (userId) {
        this.userId = userId;

        this.contactService.getUserById(userId)
          .subscribe((profile: any) => {
            this.userProfile = profile;


            if (profile.fullName) {
              const names = profile.fullName.split(' ');
              this.userProfile.firstName = names[0];
              this.userProfile.lastName = names.slice(1).join(' ');
            }


            this.form.patchValue({
              firstName: this.userProfile.firstName || '',
              lastName: this.userProfile.lastName || '',
              email: profile.email || '',
              phoneNumber: profile.phoneNumber || '',
              photo: profile.photo || ''
            });
          }, error => {
            console.error('Error al obtener el perfil del usuario:', error);
          });
      }
    });
  }

  ngOnInit() {
    this.getUserDetails();
  }


  enableEditing() {
    this.isEditing = true;


    if (!this.userProfile.firstName || !this.userProfile.lastName) {
      const names = this.userProfile.fullName ? this.userProfile.fullName.split(' ') : ['', ''];
      this.userProfile.firstName = names[0];
      this.userProfile.lastName = names.slice(1).join(' ');
    }

    this.form.patchValue({
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName
    });
  }


  saveChanges() {
    if (this.form.valid) {
      const updatedData = {
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        phoneNumber: this.form.value.phoneNumber,
        photo: this.image,
      };

      this.contactService.updateUserById(this.userId, updatedData).subscribe({
        next: (response) => {

          this.userProfile.fullName = `${updatedData.firstName} ${updatedData.lastName}`;

          this.isEditing = false;
          this.getUserDetails();
        },
        error: (error) => {
          console.error('Error actualizando el perfil:', error);
        }
      });
    }
  }


  cancelEditing() {
    this.isEditing = false;
    this.getUserDetails();
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
}

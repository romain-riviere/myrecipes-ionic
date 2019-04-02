import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'page-auth',
    templateUrl: './auth.html'
})
export class AuthPage implements OnInit {

    authForm: FormGroup;
    errorMessage: string;
    mode: boolean = false; //false = Login, true = Register

    constructor(
        private authService: AuthService,
        private menuCtrl: MenuController,
        private formBuilder: FormBuilder,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.initForm();
    }

    onToggleMenu() {
        this.menuCtrl.open();
    }

    onChangeMode() {
        this.mode = !this.mode;
    }


    initForm() {
        this.authForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmitForm() {
        const email = this.authForm.get('email').value;
        const password = this.authForm.get('password').value;
        if (this.mode) {
            this.authService.signUpUser(email, password).then(
                () => {
                    this.navCtrl.pop();
                },
                (error) => {
                    this.errorMessage = error;
                }
            );
        } else if (!this.mode) {
            this.authService.signInUser(email, password).then(
                () => {
                    this.navCtrl.pop();
                },
                (error) => {
                    this.errorMessage = error;
                }
            );
        }
    }
}
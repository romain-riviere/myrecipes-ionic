import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()
export class ToastHelper {
    constructor(private toastController: ToastController) { }

    async presentErrorToast(error) {
        if (error && error !== '') {
            const toast = await this.toastController.create({
                message: error,
                showCloseButton: true,
                duration: 2000,
                cssClass: 'error-toast'
            });
            toast.present();
        }

    }
}
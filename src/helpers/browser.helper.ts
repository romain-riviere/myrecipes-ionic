import { Injectable } from "@angular/core";
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Injectable()
export class BrowserHelper {
    constructor(private inAppBrowser: InAppBrowser) { }

    openUrl(url: string) {
        const options: InAppBrowserOptions = {
            location: 'no',
            hideurlbar: 'yes',
            hidenavigationbuttons: 'yes',
            hidden: 'yes'
        }
        this.inAppBrowser.create(url, '_self', options);
    }
}
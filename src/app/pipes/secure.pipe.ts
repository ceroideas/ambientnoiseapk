import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: any): unknown {

    let html:SafeHtml = this._sanitizer.bypassSecurityTrustHtml(value);
    return html;
  }

}

import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NavparamsService {
  private param: any;
  constructor() {}

  public setParam(param) {
    this.param = param;
  }

  getParam() {
    return this.param;
  }
}
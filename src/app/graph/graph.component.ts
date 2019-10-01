import { Component } from '@angular/core';

@Component({
  selector: 'graph',
  templateUrl: require('./graph.component.html'),
  styleUrls: [require('./graph.component.scss')]
})
export class GraphComponent {
  public selectedresource: string

  public onResourceChange(resource:string){
    console.log("resource changed: "+resource)
    this.selectedresource = resource
  }
}

import { Component, Output, EventEmitter } from '@angular/core';
import { Resource } from '../models/resource';
//import {Web3Service} from '../util/web3.service';
import { of, Observable } from 'rxjs';

//const resource_artifacts = require('../../../../build/contracts/XS.json');

@Component({
  selector: 'daoreader',
  templateUrl: require('./daoreader.component.html'),
  styleUrls: [require('./daoreader.component.scss')]
})
export class DaoReaderComponent {
  @Output() changeResource = new EventEmitter<string>(); 
  resources: Resource[] = [];
  selectedresource: Resource
  contractAbstraction: any
  contractInstance: any
  resourcesfound:Observable<string>
  
  constructor(){//private web3Service: Web3Service){
    //console.log('Constructor: ' + web3Service);
  }

  ngOnInit(){
    //add some sample data... later will read from the DAO
    this.resources.push({id:"124",version:1,name:"friends"})
    this.resources.push({id:"123",version:1,name:"team4fooddata"})
    this.resources.push({id:"125",version:1,name:"resource_categories"})
    this.selectedresource = this.resources[2];
    //this.monitorDAO();
    /*this.web3Service.artifactsToContract(resource_artifacts)
      .then((resAbstraction) => {
        this.contractAbstraction = resAbstraction;
        this.contractAbstraction.deployed().then(deployed => {
          this.contractInstance = deployed
            this.refreshGraph();
        });

      });*/
  } 

  public getResource(data:any){
    this.changeResource.emit(data.value.name)
  }

  public searchResources(){
    //not implemented .. will work with graphDB/holochain/blockchain
    return
    this.refreshGraph()
  }

  async refreshGraph(){
      console.log('Refreshing graph');
      try {
        //const deployedResource = await this.resdata.deployed();
        console.log(this.contractInstance);
        var data = await this.contractInstance.listResourcesName()
        console.log('Found info: ' + data);
        this.resourcesfound = of(data)
        //this.resources.push(resourceData);
      } catch (e) {
        console.log(e);
        //this.setStatus('Error getting resource; see log.');
      }
  }

  compareObjects(o1: any, o2: any): boolean {
    if(o1 && o2){
      return o1.name === o2.name && o1.id === o2.id;
    }
  }

  /*check for new resources on the Resource DAO */
  monitorDAO() {
    //this.web3Service.resourceObservable.subscribe((resources) => {
    //this.resources.push(resources);
    //this.model.resource = resources[0];
    this.refreshGraph();
   // });
  }
}

import { Component, NgZone, Input, SimpleChange } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"; 
//import { DATA } from '../../assets/team4fooddata.json'

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'am4chart',
  templateUrl: require('./am4chart.component.html'),
  styleUrls: [require('./am4chart.component.scss')]
})
export class am4chartComponent {
  @Input() resourceName: string
  private networkSeries: am4plugins_forceDirected.ForceDirectedSeries

  private chart: am4plugins_forceDirected.ForceDirectedTree //any //am4charts.ForceDirectedTree;

  constructor(private zone: NgZone) {}

  ngOnInit(){
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}){
    if (changes['resourceName'].isFirstChange()) {
      if(!this.resourceName)
        this.resourceName = "resource_categories"
    }
    if (!changes['resourceName'].isFirstChange()) {
      if (this.resourceName){
        this.networkSeries.data = require('../../assets/'+this.resourceName+'.json')
        this.chart.reinit()
      }
    }
  }
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      //let chart = am4core.create("chartdiv", am4charts.XYChart);
  
      let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);

    this.networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
    this.networkSeries.dataFields.linkWith = "linkWith";
    this.networkSeries.dataFields.name = "name";
    this.networkSeries.dataFields.id = "name";
    this.networkSeries.dataFields.value = "value";
    this.networkSeries.dataFields.children = "children";

    this.networkSeries.nodes.template.label.text = "{name}"
    this.networkSeries.fontSize = 8;

    let nodeTemplate = this.networkSeries.nodes.template;
    nodeTemplate.tooltipText = "{name}";
    nodeTemplate.fillOpacity = 1;
    nodeTemplate.label.hideOversized = true;
    nodeTemplate.label.truncate = true;

    let linkTemplate = this.networkSeries.links.template;
    linkTemplate.strokeWidth = 1;
    let linkHoverState = linkTemplate.states.create("hover");
    linkHoverState.properties.strokeOpacity = 1;
    linkHoverState.properties.strokeWidth = 2;

    nodeTemplate.events.on("over", function (event) {
        let dataItem = event.target.dataItem;
        dataItem.childLinks.each(function (link) {
            link.isHover = true;
        })
    })

    nodeTemplate.events.on("out", function (event) {
        let dataItem = event.target.dataItem;
        dataItem.childLinks.each(function (link) {
            link.isHover = false;
        })
    })
    const data = require('../../assets/'+this.resourceName+'.json')
    this.networkSeries.data = data
  
      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}

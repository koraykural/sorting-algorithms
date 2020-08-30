import { Component, OnInit } from "@angular/core";
import { Sorter } from "./sorter";
import { DataSet } from "./interace";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "SortingAlgorithms";
  data: DataSet[] = [];
  selectedAlgorithm = "";
  started = false;

  constructor() {}

  ngOnInit(): void {
    this.createDataSet(30);
  }

  createDataSet(length: number) {
    let sortedData = [];
    for (let i = 1; i <= length; i++) {
      sortedData.push(i);
    }
    for (let i = length - 1; 0 <= i; i--) {
      let index;
      if (i === length - 1) {
        index = Math.floor(Math.random() * 10) + 10;
      } else {
        index = Math.floor(Math.random() * (i + 1));
      }
      const number = sortedData[index];
      sortedData.splice(index, 1);
      this.data.push({ number, state: "unsorted" });
    }
  }

  speedChange(val: number) {
    const exp = (100 - val) / 50 + 1;
    Sorter.sleepTime = Math.pow(10, exp);
  }

  algorithmSelection(algo: string) {
    this.selectedAlgorithm = algo;
  }

  start() {
    if (!this.started && this.selectedAlgorithm) {
      Sorter[this.selectedAlgorithm](this.data);
      this.started = true;
    }
  }
  reset() {
    window.location.reload();
  }
}

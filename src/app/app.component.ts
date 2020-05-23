import { Component, OnInit } from '@angular/core';
import { Sorter } from './sorter';
import { DataSet } from './interace'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SortingAlgorithms';
  data: DataSet[] = [];

  constructor() {}

  ngOnInit():void {
    this.createDataSet(15);
    console.log(this.data);
  }

  createDataSet(length: number){
    for (let i = 0; i < length; i++) {
      const number = Math.floor(Math.random() * length * 5 + 5);
      this.data.push({number, state: 'unsorted'});
    }
  }

  async QuickSort() {
    this.data = await Sorter.QuickSort(this.data);
  }
  BubbleSort() {
    Sorter.BubbleSort(this.data);
  }
  InsertionSort() {
    Sorter.InsertionSort(this.data);
  }
  SelectionSort() {
    Sorter.SelectionSort(this.data);
  }
}

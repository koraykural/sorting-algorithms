import { DataSet } from './interace';

export class Sorter {
  static async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async BubbleSort(data: DataSet[]) {
    const { length } = data;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {

        // Set comparing state
        data[j].state = 'comparing';
        data[j+1].state = 'comparing';
        await this.sleep(100);

        if(data[j].number > data[j + 1].number) {
          const temp = data[j].number;
          data[j].number = data[j + 1].number;
          data[j + 1].number = temp;
          await this.sleep(100);
        }
        
        // Set back states
        data[j].state = 'unsorted';
        if(j == length-i-2)
          data[j+1].state= 'sorted';
      }
      if(i == length-1)
        data[0].state = 'sorted';
    }
  }

  static async QuickSort(data: DataSet[]): Promise<DataSet[]> {
    const { length } = data;

    if(length <= 1)
      return data;

    const pivot = data[0];
    const left: DataSet[] = [];
    const right: DataSet[] = [];

    for (let i = 1; i < length; i++) {
      data[i] < pivot ? left.push(data[i]) : right.push(data[i]);
    }

    await this.sleep(4);
    return (await this.QuickSort(left)).concat(pivot, (await this.QuickSort(right)));
  }

  static async InsertionSort(data: DataSet[]) {
    const { length } = data;

    let i = 1;
    while (i < length) {
      let key = data[i].number;
      let j = i - 1;
      while (j >= 0) {
        data[j].state = 'comparing';
        data[j+1].state = 'comparing';
        await this.sleep(100);
        if(data[j].number > data[j+1].number)
        {    
          let temp = data[j + 1];
          data[j + 1] = data[j];
          data[j] = temp;
          j--;
          await this.sleep(100);
          data[j+1].state = 'unsorted';
          data[j+2].state = 'unsorted';
        }
        else {
          data[j+1].state = 'unsorted';
          data[j].state = 'unsorted';
          break
        }
      }
      i++;
    }
    for (let i = 0; i < length; i++) {
      data[i].state = 'sorted';
      await this.sleep(50);
    }
  }

  static async SelectionSort(data: DataSet[]) {
    const { length } = data;
    for (let i = 0; i < length - 1; i++) {
      let j_min = i;
      for (let j = i + 1; j < length; j++) {

        // States
        data[j].state = 'comparing';
        data[j_min].state = 'comparing';
        await this.sleep(100);

        if (data[j].number < data[j_min].number) {
          data[j_min].state = 'unsorted';
          j_min = j;
        }
        data[j].state = 'unsorted';
        data[j_min].state = 'unsorted';
      }
      await this.sleep(100);
      if (j_min !== i) {
        const temp = data[i];
        data[i] = data[j_min];
        data[j_min] = temp;
      }
      data[i].state = 'sorted';
      await this.sleep(100);
    }
    data[length - 1].state = 'sorted';
  }
}
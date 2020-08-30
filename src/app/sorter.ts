import { DataSet } from "./interace";

export class Sorter {
  static sleepTime = 100;

  static async sleep(multiplier = 1) {
    return new Promise((resolve) =>
      setTimeout(resolve, this.sleepTime * multiplier)
    );
  }

  static async BubbleSort(data: DataSet[]) {
    const { length } = data;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        // Set comparing state
        data[j].state = "comparing";
        data[j + 1].state = "comparing";
        await this.sleep();

        if (data[j].number > data[j + 1].number) {
          const temp = data[j].number;
          data[j].number = data[j + 1].number;
          data[j + 1].number = temp;
          await this.sleep();
        }

        // Set back states
        data[j].state = "unsorted";
        if (j == length - i - 2) data[j + 1].state = "sorted";
      }
      if (i == length - 1) data[0].state = "sorted";
    }
  }

  static async InsertionSort(data: DataSet[]) {
    const { length } = data;

    let i = 1;
    while (i < length) {
      let key = data[i].number;
      let j = i - 1;
      while (j >= 0) {
        data[j].state = "comparing";
        data[j + 1].state = "comparing";
        await this.sleep();
        if (data[j].number > data[j + 1].number) {
          let temp = data[j + 1];
          data[j + 1] = data[j];
          data[j] = temp;
          j--;
          await this.sleep();
          data[j + 1].state = "unsorted";
          data[j + 2].state = "unsorted";
        } else {
          data[j + 1].state = "unsorted";
          data[j].state = "unsorted";
          break;
        }
      }
      i++;
    }
    for (let i = 0; i < length; i++) {
      data[i].state = "sorted";
      await this.sleep(1 / 3);
    }
  }

  static async SelectionSort(data: DataSet[]) {
    const { length } = data;
    for (let i = 0; i < length - 1; i++) {
      let j_min = i;
      for (let j = i + 1; j < length; j++) {
        // States
        data[j].state = "comparing";
        data[j_min].state = "comparing";
        await this.sleep();

        if (data[j].number < data[j_min].number) {
          data[j_min].state = "unsorted";
          j_min = j;
        }
        data[j].state = "unsorted";
        data[j_min].state = "unsorted";
      }
      await this.sleep();
      if (j_min !== i) {
        const temp = data[i];
        data[i] = data[j_min];
        data[j_min] = temp;
      }
      data[i].state = "sorted";
      await this.sleep();
    }
    data[length - 1].state = "sorted";
  }

  static async QuickSort(data: DataSet[]) {
    const { length } = data;

    const intervals = [[0, length - 1]];

    while (intervals.length != 0) {
      let min = intervals[0][0];
      let max = intervals[0][1];
      intervals.shift();

      if (max - min == 0) {
        data[min].state = "sorted";
        await this.sleep(2);
        continue;
      }

      const pivot = data[min].number;
      let leftIndexes = [];
      let rightIndexes = [];

      // Find corect location of pivot
      for (let i = min + 1; i <= max; i++) {
        data[min].state = "comparing";
        data[i].state = "comparing";
        await this.sleep();

        data[i].number < pivot ? leftIndexes.push(i) : rightIndexes.push(i);
        data[i].state = "unsorted";
      }

      // Put pivot into corect location
      const pivotPosition = leftIndexes.length + min;
      if (pivotPosition != min) {
        const temp = data[pivotPosition];
        data[pivotPosition] = data[min];
        data[min] = temp;
        if (rightIndexes.includes(pivotPosition)) {
          const index = rightIndexes.indexOf(pivotPosition);
          if (index !== -1) rightIndexes.splice(index, 1);
          rightIndexes.push(min);
        }
      }
      data[min].state = "unsorted";
      data[pivotPosition].state = "sorted";

      // Change positions of right and left indexes to make them correct
      for (let i = min; i < pivotPosition; i++)
        if (rightIndexes.includes(i))
          for (let j = pivotPosition + 1; j <= max; j++)
            if (leftIndexes.includes(j)) {
              // Swap one right wth one left (they are both in wrong side)
              const temp = data[j];
              data[j] = data[i];
              data[i] = temp;
              let index = leftIndexes.indexOf(j);
              if (index !== -1) leftIndexes.splice(index, 1);
              rightIndexes.push(j);
              index = rightIndexes.indexOf(i);
              if (index !== -1) rightIndexes.splice(index, 1);
              leftIndexes.push(i);
              break;
            }

      // Pretend recursive
      if (rightIndexes.length > 0) intervals.unshift([pivotPosition + 1, max]);
      if (leftIndexes.length > 0) intervals.unshift([min, pivotPosition - 1]);

      await this.sleep(3);
    }
  }

  static async MergeSort(data: DataSet[]) {
    /* -------------------- Create all future merge intervals ------------------- */
    let currentOrder = 1;
    let intervals = [{ l: 0, r: data.length - 1, order: 1 }];

    let divisible = true;
    while (divisible) {
      divisible = false;
      for (let i = 0; i < intervals.length; i++) {
        const interval = intervals[i];
        if (interval.order === currentOrder && interval.r - interval.l > 1) {
          divisible = true;
          intervals.push({
            l: Math.ceil((interval.r - interval.l) / 2) + interval.l,
            r: interval.r,
            order: currentOrder + 1,
          });
          intervals.push({
            l: interval.l,
            r: Math.ceil((interval.r - interval.l) / 2) + interval.l - 1,
            order: currentOrder + 1,
          });
        }
      }
      currentOrder++;
    }
    currentOrder--;

    /* -------------------------- Sort smallest pieces -------------------------- */
    for (let i = intervals.length - 1; i >= 0; i--) {
      const interval = intervals[i];
      if (interval.order !== currentOrder) break;
      if (interval.r === interval.l) {
        intervals.pop();
        continue;
      }

      data[interval.l].state = "comparing";
      data[interval.r].state = "comparing";
      await this.sleep(3);

      if (data[interval.l].number > data[interval.r].number) {
        const temp = data[interval.r].number;
        data[interval.r].number = data[interval.l].number;
        data[interval.l].number = temp;
        await this.sleep();
      }

      data[interval.l].state = "unsorted";
      data[interval.r].state = "unsorted";
      intervals.pop();
    }

    /* ------------------------- Merge sorted intervals ------------------------- */
    for (let i = intervals.length - 1; i >= 0; i--) {
      await this.sleep(3);
      const interval = intervals[i];

      const order = interval.order;
      let l1 = interval.l;
      let r1 = Math.ceil((interval.r - interval.l) / 2) + interval.l - 1;
      let l2 = Math.ceil((interval.r - interval.l) / 2) + interval.l;
      let r2 = interval.r;

      while (l1 <= r1 && l2 <= r2 && r1 <= r2) {
        data[l1].state = "comparing";
        data[l2].state = "comparing";
        await this.sleep();

        if (data[l1].number > data[l2].number) {
          const tmp = data[l2].number;
          // Shift right
          for (let j = l2; l1 < j; j--) {
            data[j].number = data[j - 1].number;
          }
          data[l1].number = tmp;
          this.sleep();
          data[l1].state = order === 1 ? "sorted" : "unsorted";
          data[l2].state = "unsorted";
          r1++;
          l2++;
        } else {
          data[l1].state = order === 1 ? "sorted" : "unsorted";
          data[l2].state = "unsorted";
        }
        l1++;
      }
      if (order === 1) {
        await this.sleep();
        for (let j = 15; j < 30; j++) {
          data[j].state = "sorted";
        }
      }
    }
  }
}

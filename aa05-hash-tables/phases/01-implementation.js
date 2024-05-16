class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.count = 0;
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    let loadFactor = this.count / this.capacity;

    if (loadFactor > 0.7) {
      this.resize();
    }

    let index = this.hashMod(key);

    let keyPair = new KeyValuePair(key, value);

    if (!this.data[index]) {
      this.data[index] = keyPair;
    } else {
      let current = this.data[index];
      while(current) {
        if (current.key === key) {
          current.value = value;
          return;
        }

        current = current.next;
      }

      keyPair.next = this.data[index];
      this.data[index] = keyPair;
    }

    this.count++;
  }


  read(key) {
    let index = this.hashMod(key);

    let current = this.data[index];

    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }


  resize() {
    let copyData = this.data.slice();

    this.capacity *= 2;

    this.data = new Array(this.capacity).fill(null);

    this.count = 0;

    for (let keyPair of copyData) {

      let current = keyPair;
      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }
    }
  }


  delete(key) {
    let index = this.hashMod(key);

    let current = this.data[index];

    let previous = null;

    while (current) {
      if (current.key === key) {
        if (previous === null) {
          this.data[index] = current.next;
        } else {
          previous.next = current.next;
        }

        this.count--;
        return undefined;
      }

      previous = current;
      current = current.next;
    }

    return "Key not found";
  }
}


module.exports = HashTable;

/**
 *  Arraylists use arrays as the underlying storage mechanism.  In Javascript, arrays are already
 *  unbounded - so there's not really a lot of upside to an arraylist implementation.  To practice
 *  arraylists as they must be implemented in languages with fixed size arrays, we recommend
 *  leveraging the provided `getArray` method, which uses Object.seal() to fix the length
 *  of the array.
 */
class ArrayList {
  /**
   *  Get a fixed size array initialized entirely to nulls.
   *  
   *  @param size an integer greater than or equal to zero.
   *  @return a sealed array of size nulls.
   */
  static getArray(size) {
    const toReturn = new Array(size);
    for (let i = 0; i < size; i++) {
      toReturn[i] = null;
    }
    Object.seal(toReturn);
    return toReturn;
  }

  /**
   *  Not all ArrayLists provide an initial capacity constructor, but we've chosen to do so here.
   *  
   *  @param initialCapacity - a decent guess at the eventuall size of the list, so an array
   *  of that size can be preallocated.
   */
  constructor(initialCapacity = 10) {
    this._storage = ArrayList.getArray(initialCapacity);
    this._size = 0;
  }

  /***********************
   * INSERTION BEHAVIOUR *
   ***********************/

  /**
   *  Add the item at the specified point in the list.  This should error if 
   *  the specified index is not available, or if the item is null or undefined.
   * 
   *  Tip - If the array runs out of space the traditional behaviour is to make 
   *  a new array that is larger, and copy everything in.
   *
   *  @param i the index in the list that the item should reside at.
   *  @param item the item to be inserted
   *  @return void
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n).
   */
  insert(i, item) {
    if (!item) {
      throw `${item} is an invalid item. Please try again.`;
    }

    if (i > this._size || i < 0) {
      throw `${i} is not available. The next available index is ${this._size}`;
    }

    if (this._size === this._storage.length) {
      this._expand();
    }

    for (let current = this._size; current > 0; current--){
      this._storage[current] = this._storage[current - 1];
    }
    
    this._storage[i] = item;
    this._size++;
  }

  _expand() {
    const newStorage = ArrayList.getArray(this._storage.length * 2);
    for (let i = 0; i < this._storage.length; i++) {
      newStorage[i] = this._storage[i];
    }
    this._storage = newStorage;
  }

  /**
   *  Add the item to the end of the list.  This should error if 
   *  the item is null or undefined.
   *  
   *  equivalent to `insert(length, item)`
   *  
   *  @param item the item to store
   *  @return void
   *  @timeComplexity O(1) - most of the time.  Possible worst case of O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n)
   */
  append(item) {
    this.insert(this._size, item);
  }
  /**
   *  Add the item to the beginning of the list.  This should error if 
   *  the item is null or undefined.
   *  
   *  equivalent to `insert(0, item)`
   *
   *  @param item the item to store
   *  @return void
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1) - most of the time.  Possible worst case of O(n).
   */
  prepend(item) {
    this.insert(0,item);
  }
  /*********************
   * REMOVAL BEHAVIOUR *
   *********************/

  /**
   *  Remove and return the item at the specified point in the list.  Should throw
   *  an error if i lies outside the bounds of the list.
   *  
   *  @param i the index to remove
   *  @return the item removed
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  remove(i) {
    if (this._size === 0) {
      throw 'There is nothing to remove in this list.'
    }

    if (i >= this._size || i < 0) {
      throw `${i} is outside the bounds of this list.`
    }

    const removedItem = this._storage[i];

    for (let current = i; current < this._size; current++) {
      this._storage[current] = this._storage[current + 1];
    }
    this._size--;
    return removedItem;
  }

  /**
   *  Remove and return the first item in the list, or null if the list is empty.
   *  
   *  Nearly equivalent to `remove(0)`
   *  
   *  @return the first item, or null for an empty list
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeFirst() {
    if (this._size === 0) {
      return null;
    }

    const firstItem = this._storage[0];

    for (let i = 1; i < this._storage.length; i++) {
      this._storage[i - 1] = this._storage[i];
    }

    this._size--;
    return firstItem;
  }

  /**
   *  Remove and return the last item in the list, or null if the list is empty.
   *  
   *  Nearly equivalent to `remove(length - 1)`
   *  
   *  @return the last item, or null for an empty list
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  removeLast() {
    if (this._size === 0) {
      return null;
    }

    const lastItem = this._storage[this._size - 1];
    this._storage[this._size - 1] = null;

    this._size--;
    return lastItem;
  }

  /**
   *  Remove and return the index of the first instance of the specified item
   *  from the list.  You should assume that items have an `equals` method.
   *  
   *  @param item the item to find and remove
   *  @return the index the item held in the list, or -1 if not found
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  removeItem(item) {
    if (!item) {
      return -1;
    }

    for (let i = 0; i < this._storage.length; i++) {
      if (this._storage[i] != item) {
      } else {
        const removedItem = i;
        this.remove(i);
        return removedItem;
      }
    }

    return -1;
  }

  /*****************
   * Interrogation *
   *****************/
  
  /**
   *  Returns true if the passed item is in the list, or false otherwise.
   *  
   *  @param item the item to search for.
   *  @return boolean if the item is in the list
   *  @timeComplexity O(n)
   *  @spaceComplexity O(1)
   */
  contains(item) {
    if (!item) {
      throw `${item} is an invalid choice. Please try again.`
    }

    for (let i = 0; i < this._storage.length; i++) {
      if (this._storage[i] === item) {
        return true;
      }
    }

    return false;
  }

  /**
   *  Return the item at the specified point in the list.  Should throw
   *  an error if i lies outside the bounds of the list.
   *  
   *  @param i the index to find
   *  @return the item at that point in the list.
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peek(i) {
    if (this._size === 0) {
      throw 'This list is empty.'
    }

    if (i >= this._size || i < 0) {
      throw `${i} is outside the bounds of the list.`
    }

    return this._storage[i];
  }

  /**
   *  Return the first item in the list.
   *  
   *  Almost equivalent to `peek(0)`
   *  
   *  @return the item
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekFirst() {
    if (this._size === 0) {
      return null;
    }

    return this._storage[0];
  }

  /**
   *  Return the last item in the list.
   *  
   *  Almost equivalent to `peek(length)`
   *  
   *  @return the item 
   *  @timeComplexity O(1)
   *  @spaceComplexity O(1)
   */
  peekLast() {
    if (this._size === 0) {
      return null;
    }

    return this._storage[this._size - 1];
  }

  /**
   *  Return the number of items in the list.
   *  
   *  @return the size of the list
   *  @timeComplexity O(1)
   */
  size() {
    return this._size;
  }

  /******************
   * Key Algorithms *
   ******************/

  /**
   *  Sort the list, in place.
   *
   *  @param comparator a function of the style (a, b) => int which compares two items
   *    and returns an integer such that:
   *    if a < b: return < 0
   *    if a = b: return = 0
   *    if a > b: return > 0
   *  @return void
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(log n)
   */
  sort(comparator) {
  }

  /**
   *  Return a new, sorted copy of the list.
   *
   *  @param comparator a function of the style (a, b) => int which compares two items
   *    and returns an integer such that:
   *    if a < b: return < 0
   *    if a = b: return = 0
   *    if a > b: return > 0
   *  @return void
   *  @timeComplexity O(n logn)
   *  @spaceComplexity O(n)
   */
  sorted(comparator) {
    return new ArrayList();
  }

  /**
   *  Return all the items in this list in an array.
   *  
   *  @return an array with all the items in the list.
   *  @timeComplexity O(n)
   *  @spaceComplexity O(n)
   */
  toArray() {
    if (this._size === 0) {
      return [];
    }

    var array = [];

    for (let i = 0; i < this._size; i++) {
      array = [
        ...array,
        this._storage[i]
      ]
    }

    return array;
  }
}

module.exports = ArrayList;

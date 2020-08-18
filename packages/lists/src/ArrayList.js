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

    if (i > this._size) {
      throw `${i} is not available. The next available index is ${this._size}`;
    }

    // if (i <= this._size) {
    //   //create larger array
    //   var largerArray = ArrayList.getArray(this._storage.length *2);
    //   this._storage = largerArray.push(this._storage);
    //   this._storage[i] = item;
    // }
    
    if (i <= this._size) {
      this._storage[i] = item;
      this._size++;
    }
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
    if (!item) {
      throw `${item} is an invalid item. Please try again.`;
    } else {
      this._storage[this._storage.length] = item;
    };
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
    if (!item) {
      throw `${item} is an invalid item. Please try again.`;
    } else {
      this._storage[0] = item;
    };
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
    return null;
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
    return null;
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
    return null;
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
    return null;
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
    return null;
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
    return null;
  }

  /**
   *  Return the number of items in the list.
   *  
   *  @return the size of the list
   *  @timeComplexity O(1)
   */
  size() {
    return 0;
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
    return [];
  }
}

module.exports = ArrayList;

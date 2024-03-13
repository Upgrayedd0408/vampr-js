class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    // climb "up" the tree (using iteration), counting nodes, until no Creator is found
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let numberOfVampiresOther = 0;
    let currentVampire = vampire;

    while(currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampiresOther++;
    }

   return this.numberOfVampiresFromOriginal < numberOfVampiresOther;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    // Direct match
    if (this.name === name) {
      return this; // Return this vampire object
    } 

    // Recursively search in the offspring
    for (const vampireNode of this.offspring) {
      const result = vampireNode.vampireWithName(name); // Correctly call the method on each offspring
      if (result) {
        return result; // Return the found vampire up the recursion chain
      }
    }

    return null; // Return null if no vampire was found
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let total = 0; // Start with no descendants
  
    // Iterate through each offspring
    for (const offspring of this.offspring) {
      total += 1 + offspring.totalDescendents; // Add the offspring and their descendants
    }
  
    return total; // Return the total number of descendants
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {
    let millennials = [];
  
    // Check if this vampire is a millennial
    if (this.yearConverted > 1980) {
      millennials.push(this); // Add this vampire to the list
    }
  
    // Check for millennial vampires among descendants
    for (const offspring of this.offspring) {
      millennials = millennials.concat(offspring.allMillennialVampires); // Combine lists
    }
  
    return millennials; // Return the list of millennial vampires
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;


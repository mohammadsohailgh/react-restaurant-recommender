// class TreeNode {
//     constructor(key, value = key, parent = null) {
//       this.key = key;
//       this.value = value;
//       this.parent = parent;
//       this.children = [];
//     }
  
//     get isLeaf() {
//       return this.children.length === 0;
//     }
  
//     get hasChildren() {
//       return !this.isLeaf;
//     }
//   }
  
//   class Tree {
//     constructor(key, value = key) {
//       this.root = new TreeNode(key, value);
//     }
  
//     *preOrderTraversal(node = this.root) {
//       yield node;
//       if (node.children.length) {
//         for (let child of node.children) {
//           yield* this.preOrderTraversal(child);
//         }
//       }
//     }
  
//     *postOrderTraversal(node = this.root) {
//       if (node.children.length) {
//         for (let child of node.children) {
//           yield* this.postOrderTraversal(child);
//         }
//       }
//       yield node;
//     }
  
//     insert(parentNodeKey, key, value = key) {
//       for (let node of this.preOrderTraversal()) {
//         if (node.key === parentNodeKey) {
//           node.children.push(new TreeNode(key, value, node));
//           return true;
//         }
//       }
//       return false;
//     }
  
//     remove(key) {
//       for (let node of this.preOrderTraversal()) {
//         const filtered = node.children.filter(c => c.key !== key);
//         if (filtered.length !== node.children.length) {
//           node.children = filtered;
//           return true;
//         }
//       }
//       return false;
//     }
  
//     find(key) {
//       for (let node of this.preOrderTraversal()) {
//         if (node.key === key) return node;
//       }
//       return undefined;
//     }
//   }


// const tree = new Tree(1, 'AB');

// tree.insert(1, 11, 'AC');
// tree.insert(1, 12, 'BC');
// tree.insert(12, 121, 'BG');

// [...tree.preOrderTraversal()].map(x => x.value);
// // ['AB', 'AC', 'BC', 'BCG']

// // tree.root.value;              // 'AB'
// // tree.root.hasChildren;        // true

// console.log(tree.find(12).isLeaf)       // false

// // tree.find(121).isLeaf;        // true
// // tree.find(121).parent.value;  // 'BC'

// tree.remove(12);

// [...tree.postOrderTraversal()].map(x => x.value);
// // ['AC', 'AB']








class Tree {
    #children = new Map()
    #parent = null
    #id = Math.floor(Math.random() * Date.now())
    #name

    constructor(name) {
        if(!name || typeof name !== 'string' || !name.trim().length) {
            throw new Error('Name must be a non-empty String')
        } 

        this.#name = name
    }

    get name() {
        return this.#name
    }

    set name(newName) {
        if(!newName || typeof newName !== 'string' || !newName.trim().length) {
            throw new Error('Name must be a non-empty String')
        } 

        this.#name = newName
    }

    get identifier() {
        return this.#id
    }

    get children() {
        return Array.from(this.#children.values())
    }

    get parentNode() {
        return this.#parent
    }

    get childrenCount() {
        return this.#children.size
    }

    createChildNode(name) {
        const newNode = new Tree(name)
        this.#children.set(newNode.identifier, newNode)

        return newNode
    }

}

const tree = new Tree('root')

const pre = tree.createChildNode('pre')


console.log(pre)

console.log(tree.name)
console.log(tree.identifier)
console.log(tree.parentNode)
console.log(tree.childrenCount)
console.log(tree.children)

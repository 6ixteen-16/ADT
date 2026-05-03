class Stack {
    constructor() { this.items = []; }
    push(element) { const t0 = performance.now(); this.items.push(element); return performance.now() - t0; }
    pop() { const t0 = performance.now(); if (this.isEmpty()) return { result: "Underflow", time: performance.now() - t0 }; return { result: this.items.pop(), time: performance.now() - t0 }; }
    peek() { const t0 = performance.now(); if (this.isEmpty()) return { result: "Empty", time: performance.now() - t0 }; return { result: this.items[this.items.length - 1], time: performance.now() - t0 }; }
    isEmpty() { return this.items.length === 0; }
    size() { return this.items.length; }
    clear() { const t0 = performance.now(); this.items = []; return performance.now() - t0; }
}
class Queue {
    constructor() { this.items = []; }
    enqueue(element) { const t0 = performance.now(); this.items.push(element); return performance.now() - t0; }
    dequeue() { const t0 = performance.now(); if (this.isEmpty()) return { result: "Underflow", time: performance.now() - t0 }; return { result: this.items.shift(), time: performance.now() - t0 }; }
    front() { const t0 = performance.now(); if (this.isEmpty()) return { result: "Empty", time: performance.now() - t0 }; return { result: this.items[0], time: performance.now() - t0 }; }
    rear() { const t0 = performance.now(); if (this.isEmpty()) return { result: "Empty", time: performance.now() - t0 }; return { result: this.items[this.items.length - 1], time: performance.now() - t0 }; }
    isEmpty() { return this.items.length === 0; }
    size() { return this.items.length; }
    clear() { const t0 = performance.now(); this.items = []; return performance.now() - t0; }
}
class LinkedListNode {
    constructor(value) { this.value = value; this.next = null; }
}
class LinkedList {
    constructor() { this.head = null; this.size = 0; }
    add(value) {
        const t0 = performance.now();
        const newNode = new LinkedListNode(value);
        if (!this.head) { this.head = newNode; }
        else { let current = this.head; while (current.next) { current = current.next; } current.next = newNode; }
        this.size++;
        return performance.now() - t0;
    }
    remove(value) {
        const t0 = performance.now();
        if (!this.head) return { result: false, time: performance.now() - t0 };
        if (String(this.head.value) === String(value)) { this.head = this.head.next; this.size--; return { result: true, time: performance.now() - t0 }; }
        let current = this.head;
        while (current.next) {
            if (String(current.next.value) === String(value)) { current.next = current.next.next; this.size--; return { result: true, time: performance.now() - t0 }; }
            current = current.next;
        }
        return { result: false, time: performance.now() - t0 };
    }
    find(value) {
        const t0 = performance.now();
        let current = this.head;
        let index = 0;
        while (current) {
            if (String(current.value) === String(value)) return { result: index, time: performance.now() - t0 };
            current = current.next;
            index++;
        }
        return { result: -1, time: performance.now() - t0 };
    }
    getSize() { return this.size; }
    clear() { const t0 = performance.now(); this.head = null; this.size = 0; return performance.now() - t0; }
}
class TreeNode {
    constructor(value) { this.value = value; this.left = null; this.right = null; }
}
class BinaryTree {
    constructor() { this.root = null; this.nodeCount = 0; }
    insert(value) {
        const t0 = performance.now();
        const newNode = new TreeNode(value);
        if (!this.root) { this.root = newNode; this.nodeCount++; return { result: true, time: performance.now() - t0 }; }
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) { current.left = newNode; this.nodeCount++; return { result: true, time: performance.now() - t0 }; }
                current = current.left;
            } else if (value > current.value) {
                if (!current.right) { current.right = newNode; this.nodeCount++; return { result: true, time: performance.now() - t0 }; }
                current = current.right;
            } else { return { result: false, time: performance.now() - t0 }; }
        }
    }
    find(value) {
        const t0 = performance.now();
        let current = this.root;
        while (current) {
            if (value === current.value) return { result: true, time: performance.now() - t0 };
            current = value < current.value ? current.left : current.right;
        }
        return { result: false, time: performance.now() - t0 };
    }
    inorder(node, result) {
        if (node === undefined) node = this.root;
        if (result === undefined) result = [];
        if (node) { this.inorder(node.left, result); result.push(node.value); this.inorder(node.right, result); }
        return result;
    }
    preorder(node, result) {
        if (node === undefined) node = this.root;
        if (result === undefined) result = [];
        if (node) { result.push(node.value); this.preorder(node.left, result); this.preorder(node.right, result); }
        return result;
    }
    postorder(node, result) {
        if (node === undefined) node = this.root;
        if (result === undefined) result = [];
        if (node) { this.postorder(node.left, result); this.postorder(node.right, result); result.push(node.value); }
        return result;
    }
    getSize() { return this.nodeCount; }
    clear() { const t0 = performance.now(); this.root = null; this.nodeCount = 0; return performance.now() - t0; }
    remove(value) {
        const t0 = performance.now();
        let nodeRemoved = false;
        const removeNode = (node, key) => {
            if (node === null) return null;
            if (key < node.value) { node.left = removeNode(node.left, key); return node; }
            else if (key > node.value) { node.right = removeNode(node.right, key); return node; }
            else {
                nodeRemoved = true;
                if (node.left === null && node.right === null) return null;
                if (node.left === null) return node.right;
                else if (node.right === null) return node.left;
                let tempNode = node.right;
                while (tempNode.left !== null) { tempNode = tempNode.left; }
                node.value = tempNode.value;
                node.right = removeNode(node.right, tempNode.value);
                return node;
            }
        };
        this.root = removeNode(this.root, value);
        if (nodeRemoved) this.nodeCount--;
        return { result: nodeRemoved, time: performance.now() - t0 };
    }
}
class Graph {
    constructor() { this.adjacencyList = {}; this.vertexCount = 0; this.edgeCount = 0; }
    addVertex(vertex) {
        const t0 = performance.now();
        if (vertex === null || vertex === undefined) return { result: false, time: performance.now() - t0 };
        vertex = String(vertex);
        if (!this.adjacencyList[vertex]) { this.adjacencyList[vertex] = []; this.vertexCount++; return { result: true, time: performance.now() - t0 }; }
        return { result: false, time: performance.now() - t0 };
    }
    addEdge(v1, v2) {
        const t0 = performance.now();
        v1 = String(v1); v2 = String(v2);
        if (v1 === v2) return { result: false, time: performance.now() - t0 };
        if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
            if (!this.adjacencyList[v1].includes(v2)) {
                this.adjacencyList[v1].push(v2);
                this.adjacencyList[v2].push(v1);
                this.edgeCount++;
                return { result: true, time: performance.now() - t0 };
            }
            return { result: false, time: performance.now() - t0 };
        }
        return { result: false, time: performance.now() - t0 };
    }
    removeEdge(v1, v2) {
        const t0 = performance.now();
        v1 = String(v1); v2 = String(v2);
        if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
            const idx1 = this.adjacencyList[v1].indexOf(v2);
            const idx2 = this.adjacencyList[v2].indexOf(v1);
            if (idx1 > -1 && idx2 > -1) {
                this.adjacencyList[v1].splice(idx1, 1);
                this.adjacencyList[v2].splice(idx2, 1);
                this.edgeCount--;
                return { result: true, time: performance.now() - t0 };
            }
        }
        return { result: false, time: performance.now() - t0 };
    }
    removeVertex(vertex) {
        const t0 = performance.now();
        vertex = String(vertex);
        if (this.adjacencyList[vertex]) {
            while (this.adjacencyList[vertex].length) {
                const adjacentVertex = this.adjacencyList[vertex].pop();
                this.removeEdge(vertex, adjacentVertex);
            }
            delete this.adjacencyList[vertex];
            this.vertexCount--;
            return { result: true, time: performance.now() - t0 };
        }
        return { result: false, time: performance.now() - t0 };
    }
    bfs(startVertex) {
        const t0 = performance.now();
        startVertex = String(startVertex);
        if (!this.adjacencyList[startVertex]) return { result: [], time: performance.now() - t0 };
        const queue = [startVertex];
        const result = [];
        const visited = {};
        visited[startVertex] = true;
        while (queue.length) {
            const current = queue.shift();
            result.push(current);
            this.adjacencyList[current].forEach(neighbor => {
                if (!visited[neighbor]) { visited[neighbor] = true; queue.push(neighbor); }
            });
        }
        return { result, time: performance.now() - t0 };
    }
    dfs(startVertex) {
        const t0 = performance.now();
        startVertex = String(startVertex);
        if (!this.adjacencyList[startVertex]) return { result: [], time: performance.now() - t0 };
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;
        (function dfsIter(vertex) {
            if (!vertex || visited[vertex]) return;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => { if (!visited[neighbor]) dfsIter(neighbor); });
        })(startVertex);
        return { result, time: performance.now() - t0 };
    }
    getVertexCount() { return this.vertexCount; }
    getEdgeCount() { return this.edgeCount; }
    clear() { const t0 = performance.now(); this.adjacencyList = {}; this.vertexCount = 0; this.edgeCount = 0; return performance.now() - t0; }
}
class MaxHeap {
    constructor() { this.heap = []; }
    insert(value) {
        const t0 = performance.now();
        this.heap.push(value);
        this._bubbleUp(this.heap.length - 1);
        return performance.now() - t0;
    }
    extractMax() {
        const t0 = performance.now();
        if (this.isEmpty()) return { result: "Underflow", time: performance.now() - t0 };
        if (this.heap.length === 1) return { result: this.heap.pop(), time: performance.now() - t0 };
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._sinkDown(0);
        return { result: max, time: performance.now() - t0 };
    }
    peekMax() {
        const t0 = performance.now();
        if (this.isEmpty()) return { result: "Empty", time: performance.now() - t0 };
        return { result: this.heap[0], time: performance.now() - t0 };
    }
    size() { return this.heap.length; }
    isEmpty() { return this.heap.length === 0; }
    clear() { const t0 = performance.now(); this.heap = []; return performance.now() - t0; }
    _bubbleUp(index) {
        while (index > 0) {
            const parent = Math.floor((index - 1) / 2);
            if (this.heap[parent] < this.heap[index]) {
                [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
                index = parent;
            } else break;
        }
    }
    _sinkDown(index) {
        const length = this.heap.length;
        while (true) {
            let largest = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;
            if (left < length && this.heap[left] > this.heap[largest]) largest = left;
            if (right < length && this.heap[right] > this.heap[largest]) largest = right;
            if (largest !== index) {
                [this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]];
                index = largest;
            } else break;
        }
    }
}
class HashTable {
    constructor(size = 11) {
        this.size = size;
        this.buckets = new Array(size).fill(null).map(() => []);
        this.count = 0;
    }
    _hash(key) {
        key = String(key);
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash * 31 + key.charCodeAt(i)) % this.size;
        }
        return hash;
    }
    set(key, value) {
        const t0 = performance.now();
        key = String(key);
        const index = this._hash(key);
        const bucket = this.buckets[index];
        const existing = bucket.find(pair => pair[0] === key);
        if (existing) { existing[1] = value; }
        else { bucket.push([key, value]); this.count++; }
        return performance.now() - t0;
    }
    get(key) {
        const t0 = performance.now();
        key = String(key);
        const index = this._hash(key);
        const bucket = this.buckets[index];
        const pair = bucket.find(p => p[0] === key);
        return { result: pair ? pair[1] : undefined, time: performance.now() - t0 };
    }
    delete(key) {
        const t0 = performance.now();
        key = String(key);
        const index = this._hash(key);
        const bucket = this.buckets[index];
        const pairIndex = bucket.findIndex(p => p[0] === key);
        if (pairIndex !== -1) { bucket.splice(pairIndex, 1); this.count--; return { result: true, time: performance.now() - t0 }; }
        return { result: false, time: performance.now() - t0 };
    }
    has(key) {
        const t0 = performance.now();
        key = String(key);
        const index = this._hash(key);
        const found = this.buckets[index].some(p => p[0] === key);
        return { result: found, time: performance.now() - t0 };
    }
    keys() {
        const t0 = performance.now();
        const result = [];
        this.buckets.forEach(bucket => bucket.forEach(pair => result.push(pair[0])));
        return { result, time: performance.now() - t0 };
    }
    clear() {
        const t0 = performance.now();
        this.buckets = new Array(this.size).fill(null).map(() => []);
        this.count = 0;
        return performance.now() - t0;
    }
    getCount() { return this.count; }
    getBuckets() { return this.buckets; }
}
class TowerOfHanoi {
    constructor() { this.moves = []; }
    solve(n, from, to, aux) {
        const t0 = performance.now();
        this.moves = [];
        this._hanoi(n, from, to, aux);
        return { moves: this.moves, time: performance.now() - t0 };
    }
    _hanoi(n, from, to, aux) {
        if (n === 1) { this.moves.push({ disk: n, from, to }); return; }
        this._hanoi(n - 1, from, aux, to);
        this.moves.push({ disk: n, from, to });
        this._hanoi(n - 1, aux, to, from);
    }
}

// --- HELPER ---
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
function fmtTime(ms) { return ms < 0.01 ? '<0.01ms' : ms.toFixed(4) + 'ms'; }

// --- ANIMATION HELPER ---
function animatePath(pathArray, domSelector, statusBox, logPrefix) {
    document.querySelectorAll(domSelector).forEach(n => n.classList.remove('visited'));
    if (!pathArray || pathArray.length === 0) return;
    let i = 0;
    statusBox.style.display = 'block';
    function step() {
        if (i < pathArray.length) {
            const val = pathArray[i];
            const nodes = document.querySelectorAll(domSelector);
            nodes.forEach(n => {
                const nodeVal = n.dataset.val || n.innerText;
                if (String(nodeVal) === String(val)) n.classList.add('visited');
            });
            statusBox.innerText = `${logPrefix}: [${pathArray.slice(0, i + 1).join(', ')}]`;
            i++;
            setTimeout(step, 500);
        }
    }
    step();
}

//navigation
const navBtns = document.querySelectorAll('.nav-btn');
const views = document.querySelectorAll('.main-content');
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        navBtns.forEach(b => b.classList.remove('active'));
        views.forEach(v => v.style.display = 'none');
        btn.classList.add('active');
        document.getElementById(btn.getAttribute('data-target')).style.display = 'grid';
    });
});

//stack interface
const myStack = new Stack();
const stackInput = document.getElementById('stackInput');
const stackDisplay = document.getElementById('stackDisplay');
const stackStatus = document.getElementById('stackStatus');
const stackSize = document.getElementById('stackSize');
const stackTime = document.getElementById('stackTime');
function updateStackStatus(message, time) {
    stackStatus.innerText = message;
    stackSize.innerText = myStack.size();
    if (time !== undefined) stackTime.innerText = fmtTime(time);
}
document.getElementById('pushBtn').addEventListener('click', () => {
    if (myStack.size() >= 10) { updateStackStatus("Error: OVERFLOW! Max 10 capacity reached."); return; }
    const val = parseFloat(stackInput.value);
    if (!isNaN(val)) {
        const time = myStack.push(val);
        const newEl = document.createElement('div');
        newEl.className = 'stack-element';
        newEl.innerText = val;
        stackDisplay.appendChild(newEl);
        updateStackStatus(`Pushed [ ${val} ]`, time);
        stackInput.value = ''; stackInput.focus();
    } else updateStackStatus("Error: Enter numeric value to push.");
});
document.getElementById('popBtn').addEventListener('click', () => {
    if (!myStack.isEmpty()) {
        const topEl = stackDisplay.lastElementChild;
        topEl.classList.add('popping');
        const { result: poppedVal, time } = myStack.pop();
        updateStackStatus(`Popping [ ${poppedVal} ]...`, time);
        setTimeout(() => {
            if (topEl.parentNode) stackDisplay.removeChild(topEl);
            updateStackStatus(`Popped [ ${poppedVal} ].`, time);
        }, 400);
    } else updateStackStatus("Error: Stack Underflow.");
});
document.getElementById('peekBtn').addEventListener('click', () => {
    if (!myStack.isEmpty()) {
        const topEl = stackDisplay.lastElementChild;
        topEl.classList.remove('peeking');
        void topEl.offsetWidth;
        topEl.classList.add('peeking');
        const { result, time } = myStack.peek();
        updateStackStatus(`Peeking: Top is [ ${result} ].`, time);
        setTimeout(() => topEl.classList.remove('peeking'), 1500);
    } else updateStackStatus("Error: Stack is empty.");
});
document.getElementById('isEmptyBtn').addEventListener('click', () => {
    if (myStack.isEmpty()) {
        updateStackStatus("True: Stack is empty.");
        const base = document.querySelector('.stack-base');
        base.style.boxShadow = '0 0 30px var(--neon-orange)';
        setTimeout(() => base.style.boxShadow = '0 0 20px var(--neon-blue)', 500);
    } else updateStackStatus(`False: Stack has ${myStack.size()} items.`);
});
document.getElementById('clearBtn').addEventListener('click', () => {
    const time = myStack.clear();
    stackDisplay.innerHTML = '';
    updateStackStatus("Stack cleared.", time);
});
stackInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('pushBtn').click());

//queue interface
const myQueue = new Queue();
const queueInput = document.getElementById('queueInput');
const queueDisplay = document.getElementById('queueDisplay');
const queueStatus = document.getElementById('queueStatus');
const queueSize = document.getElementById('queueSize');
const queueTime = document.getElementById('queueTime');
function updateQueueStatus(msg, time) {
    queueStatus.innerText = msg;
    queueSize.innerText = myQueue.size();
    if (time !== undefined) queueTime.innerText = fmtTime(time);
}
document.getElementById('enqueueBtn').addEventListener('click', () => {
    if (myQueue.size() >= 10) { updateQueueStatus("Error: Max 10 capacity reached."); return; }
    const val = parseFloat(queueInput.value);
    if (!isNaN(val)) {
        const time = myQueue.enqueue(val);
        const newEl = document.createElement('div');
        newEl.className = 'queue-element';
        newEl.innerText = val;
        queueDisplay.appendChild(newEl);
        updateQueueStatus(`Enqueued [ ${val} ]`, time);
        queueInput.value = ''; queueInput.focus();
    } else updateQueueStatus("Error: Enter numeric value.");
});
document.getElementById('dequeueBtn').addEventListener('click', () => {
    if (!myQueue.isEmpty()) {
        const frontEl = queueDisplay.firstElementChild;
        frontEl.classList.add('dequeuing');
        const { result: deqVal, time } = myQueue.dequeue();
        updateQueueStatus(`Dequeuing [ ${deqVal} ]...`, time);
        setTimeout(() => {
            if (frontEl.parentNode) queueDisplay.removeChild(frontEl);
            updateQueueStatus(`Dequeued [ ${deqVal} ].`, time);
        }, 400);
    } else updateQueueStatus("Error: Queue Underflow.");
});
document.getElementById('frontBtn').addEventListener('click', () => {
    if (!myQueue.isEmpty()) {
        const frontEl = queueDisplay.firstElementChild;
        frontEl.classList.remove('peeking');
        void frontEl.offsetWidth;
        frontEl.classList.add('peeking');
        const { result, time } = myQueue.front();
        updateQueueStatus(`Front is [ ${result} ].`, time);
        setTimeout(() => frontEl.classList.remove('peeking'), 1500);
    } else updateQueueStatus("Error: Queue empty.");
});
document.getElementById('rearBtn').addEventListener('click', () => {
    if (!myQueue.isEmpty()) {
        const rearEl = queueDisplay.lastElementChild;
        rearEl.classList.remove('peeking');
        void rearEl.offsetWidth;
        rearEl.classList.add('peeking');
        const { result, time } = myQueue.rear();
        updateQueueStatus(`Rear is [ ${result} ].`, time);
        setTimeout(() => rearEl.classList.remove('peeking'), 1500);
    } else updateQueueStatus("Error: Queue empty.");
});
document.getElementById('qIsEmptyBtn').addEventListener('click', () => {
    updateQueueStatus(myQueue.isEmpty() ? "True: Queue empty." : `False: Queue has ${myQueue.size()} items.`);
});
document.getElementById('qClearBtn').addEventListener('click', () => {
    const time = myQueue.clear();
    queueDisplay.innerHTML = '';
    updateQueueStatus("Queue cleared.", time);
});
queueInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('enqueueBtn').click());

//linked list interface
const myList = new LinkedList();
const listInput = document.getElementById('listInput');
const listDisplay = document.getElementById('listDisplay');
const listStatus = document.getElementById('listStatus');
const listSize = document.getElementById('listSize');
const listTime = document.getElementById('listTime');
function renderList() {
    listDisplay.innerHTML = '';
    let current = myList.head;
    while (current) {
        const wrap = document.createElement('div');
        wrap.className = 'list-node-wrapper';
        const node = document.createElement('div');
        node.className = 'list-node';
        node.innerText = current.value;
        wrap.appendChild(node);
        if (current.next) {
            const arrow = document.createElement('div');
            arrow.className = 'list-arrow';
            arrow.innerHTML = '&rightarrow;';
            wrap.appendChild(arrow);
        }
        listDisplay.appendChild(wrap);
        current = current.next;
    }
    listSize.innerText = myList.getSize();
}
document.getElementById('addNodeBtn').addEventListener('click', () => {
    if (myList.getSize() >= 10) { listStatus.innerText = "Error: Max 10 capacity reached."; return; }
    const val = parseFloat(listInput.value);
    if (!isNaN(val)) {
        const time = myList.add(val);
        renderList();
        listStatus.innerText = `Added node [ ${val} ]`;
        listTime.innerText = fmtTime(time);
        listInput.value = ''; listInput.focus();
    } else listStatus.innerText = "Error: Enter numeric value.";
});
document.getElementById('removeNodeBtn').addEventListener('click', () => {
    const val = parseFloat(listInput.value);
    if (!isNaN(val)) {
        const { result: idx } = myList.find(val);
        if (idx !== -1) {
            const wrapper = listDisplay.children[idx];
            wrapper.classList.add('removing');
            setTimeout(() => {
                const { result, time } = myList.remove(val);
                renderList();
                listStatus.innerText = `Removed node [ ${val} ]`;
                listTime.innerText = fmtTime(time);
            }, 400);
        } else listStatus.innerText = "Value not found.";
        listInput.value = '';
    } else listStatus.innerText = "Error: Enter numeric value.";
});
document.getElementById('findNodeBtn').addEventListener('click', () => {
    const val = parseFloat(listInput.value);
    if (!isNaN(val)) {
        const { result: idx, time } = myList.find(val);
        if (idx !== -1) {
            listStatus.innerText = `Found [ ${val} ] at Indx ${idx}`;
            listTime.innerText = fmtTime(time);
            const node = listDisplay.children[idx].querySelector('.list-node');
            node.classList.add('finding');
            setTimeout(() => node.classList.remove('finding'), 2000);
        } else listStatus.innerText = "Value not found.";
    } else listStatus.innerText = "Error: Enter numeric value.";
});
document.getElementById('listClearBtn').addEventListener('click', () => {
    const time = myList.clear();
    renderList();
    listStatus.innerText = "List cleared.";
    listTime.innerText = fmtTime(time);
});
listInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('addNodeBtn').click());

//tree interface
const myTree = new BinaryTree();
const treeInput = document.getElementById('treeInput');
const treeDisplay = document.getElementById('treeDisplay');
const treeStatus = document.getElementById('treeStatus');
const treeTime = document.getElementById('treeTime');
const inorderResultBox = document.getElementById('inorderResultBox');
function renderTree() {
    treeDisplay.innerHTML = '';
    if (!myTree.root) return;
    const rootW = treeDisplay.clientWidth;
    function drawNode(node, x, y, xOffset) {
        if (!node) return;
        if (node.left) {
            const childX = x - xOffset;
            const childY = y + 70;
            drawLine(x, y + 22, childX, childY - 22);
            drawNode(node.left, childX, childY, xOffset / 2);
        }
        if (node.right) {
            const childX = x + xOffset;
            const childY = y + 70;
            drawLine(x, y + 22, childX, childY - 22);
            drawNode(node.right, childX, childY, xOffset / 2);
        }
        const dNode = document.createElement('div');
        dNode.className = 'tree-node';
        dNode.innerText = node.value;
        dNode.style.left = `${x}px`;
        dNode.style.top = `${y}px`;
        dNode.dataset.val = node.value;
        treeDisplay.appendChild(dNode);
    }
    function drawLine(x1, y1, x2, y2) {
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        const line = document.createElement('div');
        line.className = 'tree-line';
        line.style.width = `${length}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        treeDisplay.appendChild(line);
    }
    drawNode(myTree.root, rootW / 2, 40, rootW / 4);
}
document.getElementById('insertTreeBtn').addEventListener('click', () => {
    if (document.querySelectorAll('.tree-node').length >= 10) { treeStatus.innerText = "Error: Max 10 nodes allowed."; return; }
    const val = parseFloat(treeInput.value);
    if (!isNaN(val)) {
        const { result, time } = myTree.insert(val);
        renderTree();
        treeStatus.innerText = `Inserted [ ${val} ] into BST.`;
        treeTime.innerText = fmtTime(time);
        treeInput.value = ''; treeInput.focus();
        inorderResultBox.style.display = 'none';
    } else treeStatus.innerText = "Error: Tree strictly requires numbers.";
});
document.getElementById('findTreeBtn').addEventListener('click', () => {
    const val = parseFloat(treeInput.value);
    if (!isNaN(val)) {
        const { result, time } = myTree.find(val);
        if (result) {
            treeStatus.innerText = `Found Node [ ${val} ]!`;
            treeTime.innerText = fmtTime(time);
            const nodes = document.querySelectorAll('.tree-node');
            nodes.forEach(n => {
                if (parseFloat(n.dataset.val) === val) {
                    n.classList.add('finding');
                    setTimeout(() => n.classList.remove('finding'), 2000);
                }
            });
        } else {
            treeStatus.innerText = `Node [ ${val} ] not found.`;
            treeTime.innerText = fmtTime(time);
        }
    } else treeStatus.innerText = "Error: Enter a valid number.";
});
document.getElementById('removeTreeBtn').addEventListener('click', () => {
    const val = parseFloat(treeInput.value);
    if (!isNaN(val)) {
        const { result, time } = myTree.remove(val);
        if (result) {
            renderTree();
            treeStatus.innerText = `Removed Node [ ${val} ] from BST.`;
        } else {
            treeStatus.innerText = `Node [ ${val} ] not found.`;
        }
        treeTime.innerText = fmtTime(time);
        treeInput.value = ''; treeInput.focus();
        inorderResultBox.style.display = 'none';
    } else treeStatus.innerText = "Error: Enter a valid number to remove.";
});
document.getElementById('inorderBtn').addEventListener('click', () => {
    const t0 = performance.now();
    const result = myTree.inorder();
    treeTime.innerText = fmtTime(performance.now() - t0);
    treeStatus.innerText = `Inorder Traversal Running...`;
    animatePath(result, '.tree-node', inorderResultBox, 'Inorder');
});
document.getElementById('preorderBtn').addEventListener('click', () => {
    const t0 = performance.now();
    const result = myTree.preorder();
    treeTime.innerText = fmtTime(performance.now() - t0);
    treeStatus.innerText = `Preorder Traversal Running...`;
    animatePath(result, '.tree-node', inorderResultBox, 'Preorder');
});
document.getElementById('postorderBtn').addEventListener('click', () => {
    const t0 = performance.now();
    const result = myTree.postorder();
    treeTime.innerText = fmtTime(performance.now() - t0);
    treeStatus.innerText = `Postorder Traversal Running...`;
    animatePath(result, '.tree-node', inorderResultBox, 'Postorder');
});
document.getElementById('treeClearBtn').addEventListener('click', () => {
    const time = myTree.clear();
    renderTree();
    treeStatus.innerText = "Tree Cleared.";
    treeTime.innerText = fmtTime(time);
    inorderResultBox.style.display = 'none';
});
treeInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('insertTreeBtn').click());
window.addEventListener('resize', renderTree);

//graph interface
const myGraph = new Graph();
const vInput = document.getElementById('vertexInput');
const edgeV1 = document.getElementById('edgeV1');
const edgeV2 = document.getElementById('edgeV2');
const graphDisplay = document.getElementById('graphDisplay');
const graphSvgEdges = document.getElementById('graphSvgEdges');
const graphStatus = document.getElementById('graphStatus');
const graphTime = document.getElementById('graphTime');
const vertexCoords = {};
function updateGraphEdges() {
    const svg = document.getElementById('graphSvgEdges');
    if (!svg) return;
    svg.innerHTML = '';
    const edgesDrawn = new Set();
    Object.keys(myGraph.adjacencyList).forEach(v1 => {
        myGraph.adjacencyList[v1].forEach(v2 => {
            const edgeId = [String(v1), String(v2)].sort().join('-');
            if (!edgesDrawn.has(edgeId) && vertexCoords[v1] && vertexCoords[v2]) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                line.dataset.v1 = v1;
                line.dataset.v2 = v2;
                line.setAttribute('x1', vertexCoords[v1].x + 22.5);
                line.setAttribute('y1', vertexCoords[v1].y + 22.5);
                line.setAttribute('x2', vertexCoords[v2].x + 22.5);
                line.setAttribute('y2', vertexCoords[v2].y + 22.5);
                line.setAttribute('class', 'graph-edge');
                svg.appendChild(line);
                edgesDrawn.add(edgeId);
            }
        });
    });
}
function renderGraph() {
    graphDisplay.innerHTML = '<svg id="graphSvgEdges"></svg>';
    updateGraphEdges();
    Object.keys(myGraph.adjacencyList).forEach(v => {
        const dNode = document.createElement('div');
        dNode.className = 'graph-node';
        dNode.innerText = v;
        dNode.dataset.v = v;
        dNode.style.left = `${vertexCoords[v].x}px`;
        dNode.style.top = `${vertexCoords[v].y}px`;
        dNode.style.cursor = 'grab';
        graphDisplay.appendChild(dNode);
    });
}
document.getElementById('addVertexBtn').addEventListener('click', () => {
    if (myGraph.getVertexCount() >= 10) { graphStatus.innerText = "Error: Max 10 vertices allowed."; return; }
    const v = String(parseFloat(vInput.value) || vInput.value).trim();
    if (v && v !== 'NaN') {
        const { result, time } = myGraph.addVertex(v);
        if (result) {
            const w = graphDisplay.clientWidth;
            const h = graphDisplay.clientHeight;
            vertexCoords[v] = { x: Math.random() * (w - 100) + 50, y: Math.random() * (h - 100) + 50 };
            renderGraph();
            graphStatus.innerText = `Added Vertex [ ${v} ]`;
            graphTime.innerText = fmtTime(time);
            vInput.value = ''; vInput.focus();
        } else {
            graphStatus.innerText = `Vertex [ ${v} ] already exists.`;
        }
    } else graphStatus.innerText = "Error: Enter a valid vertex name.";
});
document.getElementById('addEdgeBtn').addEventListener('click', () => {
    const v1 = String(parseFloat(edgeV1.value) || edgeV1.value).trim();
    const v2 = String(parseFloat(edgeV2.value) || edgeV2.value).trim();
    if (v1 && v2 && v1 !== 'NaN' && v2 !== 'NaN' && v1 !== v2) {
        const { result, time } = myGraph.addEdge(v1, v2);
        if (result) {
            renderGraph();
            graphStatus.innerText = `Added Edge [ ${v1} - ${v2} ]`;
            graphTime.innerText = fmtTime(time);
            edgeV1.value = ''; edgeV2.value = '';
        } else {
            graphStatus.innerText = `Edge already exists or vertices do not exist!`;
        }
    } else graphStatus.innerText = "Error: Enter two different valid vertices.";
});
document.getElementById('removeEdgeBtn').addEventListener('click', () => {
    const v1 = String(parseFloat(edgeV1.value) || edgeV1.value).trim();
    const v2 = String(parseFloat(edgeV2.value) || edgeV2.value).trim();
    if (v1 && v2 && v1 !== 'NaN' && v2 !== 'NaN') {
        const { result, time } = myGraph.removeEdge(v1, v2);
        if (result) {
            renderGraph();
            graphStatus.innerText = `Removed Edge [ ${v1} - ${v2} ]`;
            graphTime.innerText = fmtTime(time);
        } else {
            graphStatus.innerText = `Edge doesn't exist.`;
        }
    } else graphStatus.innerText = "Error: Enter valid vertices.";
});
document.getElementById('bfsBtn').addEventListener('click', () => {
    const keys = Object.keys(myGraph.adjacencyList);
    if (!keys.length) { graphStatus.innerText = "Error: Graph is empty."; return; }
    const inputVal = String(parseFloat(vInput.value) || vInput.value).trim();
    let startObj = (inputVal && inputVal !== 'NaN' && myGraph.adjacencyList[inputVal]) ? inputVal : keys[0];
    graphStatus.innerText = `BFS Route from [ ${startObj} ]`;
    const { result, time } = myGraph.bfs(startObj);
    graphTime.innerText = fmtTime(time);
    const graphResultBox = document.getElementById('graphResultBox');
    animatePath(result, '.graph-node', graphResultBox, 'BFS Path');
});
document.getElementById('dfsBtn').addEventListener('click', () => {
    const keys = Object.keys(myGraph.adjacencyList);
    if (!keys.length) { graphStatus.innerText = "Error: Graph is empty."; return; }
    const inputVal = String(parseFloat(vInput.value) || vInput.value).trim();
    let startObj = (inputVal && inputVal !== 'NaN' && myGraph.adjacencyList[inputVal]) ? inputVal : keys[0];
    graphStatus.innerText = `DFS Route from [ ${startObj} ]`;
    const { result, time } = myGraph.dfs(startObj);
    graphTime.innerText = fmtTime(time);
    const graphResultBox = document.getElementById('graphResultBox');
    animatePath(result, '.graph-node', graphResultBox, 'DFS Path');
});
document.getElementById('graphClearBtn').addEventListener('click', () => {
    const time = myGraph.clear();
    for (let k in vertexCoords) delete vertexCoords[k];
    renderGraph();
    graphStatus.innerText = "Graph Cleared.";
    graphTime.innerText = fmtTime(time);
});
vInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('addVertexBtn').click());
let draggedVertex = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
graphDisplay.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('graph-node')) {
        draggedVertex = e.target.dataset.v;
        const rect = e.target.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        e.target.style.cursor = 'grabbing';
    }
});
graphDisplay.addEventListener('mousemove', (e) => {
    if (!draggedVertex) return;
    const containerRect = graphDisplay.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffsetX;
    const newY = e.clientY - containerRect.top - dragOffsetY;
    vertexCoords[draggedVertex].x = Math.max(0, Math.min(newX, containerRect.width - 45));
    vertexCoords[draggedVertex].y = Math.max(0, Math.min(newY, containerRect.height - 45));
    renderGraph();
});
graphDisplay.addEventListener('mouseup', () => {
    if (draggedVertex) {
        const vertex = document.querySelector(`[data-v="${draggedVertex}"]`);
        if (vertex) vertex.style.cursor = 'grab';
        draggedVertex = null;
    }
});
graphDisplay.addEventListener('mouseleave', () => { draggedVertex = null; });

//sorting
let sortArray = [];
const sortInput = document.getElementById('sortInput');
const sortingDisplay = document.getElementById('sortingDisplay');
const sortStatus = document.getElementById('sortStatus');
const sortSize = document.getElementById('sortSize');
const sortTimeComp = document.getElementById('sortTimeComp');
const sortSpaceComp = document.getElementById('sortSpaceComp');
const sortTime = document.getElementById('sortTime');
function updateSortDisplay() {
    sortingDisplay.innerHTML = '';
    sortArray.forEach((val, idx) => {
        const bar = document.createElement('div');
        bar.className = 'sort-bar';
        bar.innerText = val;
        bar.id = `bar-${idx}`;
        sortingDisplay.appendChild(bar);
    });
    sortSize.innerText = sortArray.length;
}
function setSortComplexity(algo) {
    const complexities = {
        bubble: { time: "O(n²)", space: "O(1)" },
        selection: { time: "O(n²)", space: "O(1)" },
        insertion: { time: "O(n²)", space: "O(1)" },
        merge: { time: "O(n log n)", space: "O(n)" },
        quick: { time: "O(n log n)", space: "O(log n)" }
    };
    sortTimeComp.innerHTML = `Time: <strong>${complexities[algo].time}</strong>`;
    sortSpaceComp.innerHTML = `Space: <strong>${complexities[algo].space}</strong>`;
}
document.getElementById('addSortBtn').addEventListener('click', () => {
    if (sortArray.length >= 10) { sortStatus.innerText = "Error: Max 10 items allowed."; return; }
    const val = parseFloat(sortInput.value);
    if (!isNaN(val)) {
        sortArray.push(val);
        updateSortDisplay();
        sortStatus.innerText = `Added [ ${val} ]`;
        sortInput.value = ''; sortInput.focus();
    }
});
document.getElementById('randomSortBtn').addEventListener('click', () => {
    sortArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    updateSortDisplay();
    sortStatus.innerText = "Random array generated.";
});
document.getElementById('sortClearBtn').addEventListener('click', () => {
    sortArray = [];
    updateSortDisplay();
    sortStatus.innerText = "Array cleared.";
});
async function bubbleSort() {
    setSortComplexity('bubble');
    const t0 = performance.now();
    const bars = sortingDisplay.children;
    for (let i = 0; i < sortArray.length; i++) {
        for (let j = 0; j < sortArray.length - i - 1; j++) {
            bars[j].classList.add('comparing');
            bars[j + 1].classList.add('comparing');
            sortStatus.innerText = `Comparing ${sortArray[j]} and ${sortArray[j + 1]}`;
            await sleep(400);
            if (sortArray[j] > sortArray[j + 1]) {
                bars[j].classList.add('swapping');
                bars[j + 1].classList.add('swapping');
                sortStatus.innerText = `Swapping ${sortArray[j]} and ${sortArray[j + 1]}`;
                [sortArray[j], sortArray[j + 1]] = [sortArray[j + 1], sortArray[j]];
                updateSortDisplay();
                await sleep(400);
            }
            document.querySelectorAll('.sort-bar').forEach(b => b.classList.remove('comparing', 'swapping'));
        }
        document.getElementById(`bar-${sortArray.length - i - 1}`).classList.add('sorted');
    }
    sortStatus.innerText = "Bubble Sort Complete!";
    sortTime.innerText = fmtTime(performance.now() - t0);
}
async function selectionSort() {
    setSortComplexity('selection');
    const t0 = performance.now();
    const bars = sortingDisplay.children;
    for (let i = 0; i < sortArray.length; i++) {
        let minIdx = i;
        bars[i].classList.add('comparing');
        for (let j = i + 1; j < sortArray.length; j++) {
            bars[j].classList.add('comparing');
            await sleep(300);
            if (sortArray[j] < sortArray[minIdx]) {
                if (minIdx !== i) bars[minIdx].classList.remove('swapping');
                minIdx = j;
                bars[minIdx].classList.add('swapping');
            } else {
                bars[j].classList.remove('comparing');
            }
        }
        if (minIdx !== i) {
            [sortArray[i], sortArray[minIdx]] = [sortArray[minIdx], sortArray[i]];
            updateSortDisplay();
            await sleep(400);
        }
        document.querySelectorAll('.sort-bar').forEach(b => b.classList.remove('comparing', 'swapping'));
        for (let k = 0; k <= i; k++) document.getElementById(`bar-${k}`).classList.add('sorted');
    }
    sortStatus.innerText = "Selection Sort Complete!";
    sortTime.innerText = fmtTime(performance.now() - t0);
}
async function insertionSort() {
    setSortComplexity('insertion');
    const t0 = performance.now();
    for (let i = 1; i < sortArray.length; i++) {
        let key = sortArray[i];
        let j = i - 1;
        document.getElementById(`bar-${i}`).classList.add('swapping');
        while (j >= 0 && sortArray[j] > key) {
            document.getElementById(`bar-${j}`).classList.add('comparing');
            await sleep(400);
            sortArray[j + 1] = sortArray[j];
            j--;
            updateSortDisplay();
            document.querySelectorAll('.sort-bar').forEach((b, idx) => { if (idx <= i) b.classList.add('sorted'); });
        }
        sortArray[j + 1] = key;
        updateSortDisplay();
        await sleep(400);
        document.querySelectorAll('.sort-bar').forEach((b, idx) => { if (idx <= i) b.classList.add('sorted'); });
    }
    sortStatus.innerText = "Insertion Sort Complete!";
    sortTime.innerText = fmtTime(performance.now() - t0);
}
async function mergeSort(arr = sortArray, start = 0) {
    setSortComplexity('merge');
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid), start);
    const right = await mergeSort(arr.slice(mid), start + mid);
    return await merge(left, right, start);
}
async function merge(left, right, start) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    result = result.concat(left.slice(i)).concat(right.slice(j));
    for (let k = 0; k < result.length; k++) {
        sortArray[start + k] = result[k];
        updateSortDisplay();
        document.getElementById(`bar-${start + k}`).classList.add('swapping');
        await sleep(200);
    }
    document.querySelectorAll('.sort-bar').forEach(b => b.classList.remove('swapping'));
    return result;
}
async function quickSort(start = 0, end = sortArray.length - 1) {
    setSortComplexity('quick');
    if (start >= end) return;
    let index = await partition(start, end);
    await Promise.all([quickSort(start, index - 1), quickSort(index + 1, end)]);
    if (start === 0 && end === sortArray.length - 1) {
        updateSortDisplay();
        document.querySelectorAll('.sort-bar').forEach(b => b.classList.add('sorted'));
        sortStatus.innerText = "Quick Sort Complete!";
    }
}
async function partition(start, end) {
    let pivotValue = sortArray[end];
    let pivotIndex = start;
    document.getElementById(`bar-${end}`).classList.add('comparing');
    for (let i = start; i < end; i++) {
        document.getElementById(`bar-${i}`).classList.add('comparing');
        if (sortArray[i] < pivotValue) {
            [sortArray[i], sortArray[pivotIndex]] = [sortArray[pivotIndex], sortArray[i]];
            pivotIndex++;
            updateSortDisplay();
            await sleep(200);
        }
        document.getElementById(`bar-${i}`).classList.remove('comparing');
    }
    [sortArray[pivotIndex], sortArray[end]] = [sortArray[end], sortArray[pivotIndex]];
    updateSortDisplay();
    await sleep(200);
    return pivotIndex;
}
document.getElementById('bubbleSortBtn').addEventListener('click', bubbleSort);
document.getElementById('selectionSortBtn').addEventListener('click', selectionSort);
document.getElementById('insertionSortBtn').addEventListener('click', insertionSort);
document.getElementById('mergeSortBtn').addEventListener('click', () => {
    const t0 = performance.now();
    mergeSort().then(() => {
        sortStatus.innerText = "Merge Sort Complete!";
        document.querySelectorAll('.sort-bar').forEach(b => b.classList.add('sorted'));
        sortTime.innerText = fmtTime(performance.now() - t0);
    });
});
document.getElementById('quickSortBtn').addEventListener('click', () => {
    const t0 = performance.now();
    quickSort().then(() => { sortTime.innerText = fmtTime(performance.now() - t0); });
});

// --- SEARCHING IMPLEMENTATION ---
let searchArray = [];
const searchInput = document.getElementById('searchInput');
const searchTarget = document.getElementById('searchTarget');
const searchingDisplay = document.getElementById('searchingDisplay');
const searchStatus = document.getElementById('searchStatus');
const searchSize = document.getElementById('searchSize');
const searchTime = document.getElementById('searchTime');
function updateSearchDisplay() {
    searchingDisplay.innerHTML = '';
    searchArray.forEach((val, idx) => {
        const box = document.createElement('div');
        box.className = 'search-box';
        box.innerText = val;
        box.id = `box-${idx}`;
        searchingDisplay.appendChild(box);
    });
    searchSize.innerText = searchArray.length;
}
document.getElementById('addSearchBtn').addEventListener('click', () => {
    if (searchArray.length >= 10) { searchStatus.innerText = "Error: Max 10 items."; return; }
    const val = parseFloat(searchInput.value);
    if (!isNaN(val)) {
        searchArray.push(val);
        updateSearchDisplay();
        searchStatus.innerText = `Added [ ${val} ]`;
        searchInput.value = ''; searchInput.focus();
    }
});
document.getElementById('randomSearchBtn').addEventListener('click', () => {
    searchArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    updateSearchDisplay();
});
document.getElementById('searchClearBtn').addEventListener('click', () => {
    searchArray = [];
    updateSearchDisplay();
    searchStatus.innerText = "Array cleared.";
});
async function linearSearch() {
    const t0 = performance.now();
    const target = parseFloat(searchTarget.value);
    if (isNaN(target)) { searchStatus.innerText = "Error: Enter target value."; return; }
    const boxes = searchingDisplay.children;
    for (let i = 0; i < searchArray.length; i++) {
        boxes[i].classList.add('checking');
        searchStatus.innerText = `Checking index ${i}: ${searchArray[i]} == ${target}?`;
        await sleep(500);
        if (searchArray[i] === target) {
            boxes[i].classList.remove('checking');
            boxes[i].classList.add('found');
            searchStatus.innerText = `Found ${target} at index ${i}!`;
            searchTime.innerText = fmtTime(performance.now() - t0);
            return;
        }
        boxes[i].classList.remove('checking');
        boxes[i].classList.add('discarded');
    }
    searchStatus.innerText = `${target} not found in array.`;
    searchTime.innerText = fmtTime(performance.now() - t0);
}
async function binarySearch() {
    const t0 = performance.now();
    const target = parseFloat(searchTarget.value);
    if (isNaN(target)) { searchStatus.innerText = "Error: Enter target value."; return; }
    searchStatus.innerText = "Sorting array for Binary Search...";
    searchArray.sort((a, b) => a - b);
    updateSearchDisplay();
    await sleep(1000);
    const boxes = searchingDisplay.children;
    let left = 0, right = searchArray.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        boxes[mid].classList.add('checking');
        searchStatus.innerText = `Checking middle index ${mid}: ${searchArray[mid]}`;
        await sleep(800);
        if (searchArray[mid] === target) {
            boxes[mid].classList.remove('checking');
            boxes[mid].classList.add('found');
            searchStatus.innerText = `Found ${target} at index ${mid}!`;
            searchTime.innerText = fmtTime(performance.now() - t0);
            return;
        }
        if (searchArray[mid] < target) {
            for (let k = left; k <= mid; k++) boxes[k].classList.add('discarded');
            left = mid + 1;
        } else {
            for (let k = mid; k <= right; k++) boxes[k].classList.add('discarded');
            right = mid - 1;
        }
        boxes[mid].classList.remove('checking');
        await sleep(400);
    }
    searchStatus.innerText = `${target} not found.`;
    searchTime.innerText = fmtTime(performance.now() - t0);
}
document.getElementById('linearSearchBtn').addEventListener('click', linearSearch);
document.getElementById('binarySearchBtn').addEventListener('click', binarySearch);

// --- HEAP INTERFACE ---
const myHeap = new MaxHeap();
const heapInput = document.getElementById('heapInput');
const heapDisplay = document.getElementById('heapDisplay');
const heapStatus = document.getElementById('heapStatus');
const heapSizeEl = document.getElementById('heapSize');
const heapTime = document.getElementById('heapTime');
function renderHeap() {
    heapDisplay.innerHTML = '';
    const arr = myHeap.heap;
    if (!arr.length) return;
    const w = heapDisplay.clientWidth;
    function drawHeapNode(index, x, y, xOffset) {
        if (index >= arr.length) return;
        const left = 2 * index + 1;
        const right = 2 * index + 2;
        if (left < arr.length) {
            const childX = x - xOffset;
            const childY = y + 70;
            drawHeapLine(x, y + 22, childX, childY - 22);
            drawHeapNode(left, childX, childY, xOffset / 2);
        }
        if (right < arr.length) {
            const childX = x + xOffset;
            const childY = y + 70;
            drawHeapLine(x, y + 22, childX, childY - 22);
            drawHeapNode(right, childX, childY, xOffset / 2);
        }
        const dNode = document.createElement('div');
        dNode.className = 'tree-node';
        dNode.innerText = arr[index];
        dNode.style.left = `${x}px`;
        dNode.style.top = `${y}px`;
        dNode.dataset.val = arr[index];
        if (index === 0) dNode.style.background = 'linear-gradient(135deg, var(--neon-orange), #c2410c)';
        heapDisplay.appendChild(dNode);
    }
    function drawHeapLine(x1, y1, x2, y2) {
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        const line = document.createElement('div');
        line.className = 'tree-line';
        line.style.width = `${length}px`;
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.transform = `rotate(${angle}deg)`;
        heapDisplay.appendChild(line);
    }
    drawHeapNode(0, w / 2, 40, w / 4);
    heapSizeEl.innerText = myHeap.size();
}
document.getElementById('heapInsertBtn').addEventListener('click', () => {
    if (myHeap.size() >= 15) { heapStatus.innerText = "Error: Max 15 elements reached."; return; }
    const val = parseFloat(heapInput.value);
    if (!isNaN(val)) {
        const time = myHeap.insert(val);
        renderHeap();
        heapStatus.innerText = `Inserted [ ${val} ]`;
        heapTime.innerText = fmtTime(time);
        heapInput.value = ''; heapInput.focus();
    } else heapStatus.innerText = "Error: Enter numeric value.";
});
document.getElementById('heapExtractBtn').addEventListener('click', () => {
    const { result, time } = myHeap.extractMax();
    if (result === "Underflow") { heapStatus.innerText = "Error: Heap is empty."; return; }
    renderHeap();
    heapStatus.innerText = `Extracted Max [ ${result} ]`;
    heapTime.innerText = fmtTime(time);
});
document.getElementById('heapPeekBtn').addEventListener('click', () => {
    const { result, time } = myHeap.peekMax();
    if (result === "Empty") { heapStatus.innerText = "Error: Heap is empty."; return; }
    heapStatus.innerText = `Max element is [ ${result} ]`;
    heapTime.innerText = fmtTime(time);
    const nodes = heapDisplay.querySelectorAll('.tree-node');
    if (nodes.length) {
        nodes[nodes.length - 1].classList.add('finding');
        setTimeout(() => nodes[nodes.length - 1].classList.remove('finding'), 1500);
    }
});
document.getElementById('heapSizeBtn').addEventListener('click', () => {
    heapStatus.innerText = `Heap size is [ ${myHeap.size()} ]`;
});
document.getElementById('heapIsEmptyBtn').addEventListener('click', () => {
    heapStatus.innerText = myHeap.isEmpty() ? "True: Heap is empty." : `False: Heap has ${myHeap.size()} elements.`;
});
document.getElementById('heapClearBtn').addEventListener('click', () => {
    const time = myHeap.clear();
    renderHeap();
    heapStatus.innerText = "Heap cleared.";
    heapTime.innerText = fmtTime(time);
    heapSizeEl.innerText = 0;
});
heapInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('heapInsertBtn').click());

// --- HASH TABLE INTERFACE ---
const myHash = new HashTable();
const hashKey = document.getElementById('hashKey');
const hashValue = document.getElementById('hashValue');
const hashDisplay = document.getElementById('hashDisplay');
const hashStatus = document.getElementById('hashStatus');
const hashCount = document.getElementById('hashCount');
const hashBuckets = document.getElementById('hashBuckets');
const hashTime = document.getElementById('hashTime');
function renderHashTable() {
    hashDisplay.innerHTML = '';
    const buckets = myHash.getBuckets();
    buckets.forEach((bucket, index) => {
        const row = document.createElement('div');
        row.className = 'hash-row';
        const indexEl = document.createElement('div');
        indexEl.className = 'hash-index';
        indexEl.innerText = index;
        row.appendChild(indexEl);
        const chain = document.createElement('div');
        chain.className = 'hash-chain';
        if (bucket.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'hash-empty';
            empty.innerText = '∅';
            chain.appendChild(empty);
        } else {
            bucket.forEach((pair, pIdx) => {
                const item = document.createElement('div');
                item.className = 'hash-item';
                item.dataset.key = pair[0];
                item.innerText = `"${pair[0]}": ${pair[1]}`;
                chain.appendChild(item);
                if (pIdx < bucket.length - 1) {
                    const arrow = document.createElement('span');
                    arrow.className = 'hash-arrow';
                    arrow.innerText = '→';
                    chain.appendChild(arrow);
                }
            });
        }
        row.appendChild(chain);
        hashDisplay.appendChild(row);
    });
    hashCount.innerText = myHash.getCount();
    hashBuckets.innerText = myHash.size;
}
renderHashTable();
document.getElementById('hashSetBtn').addEventListener('click', () => {
    const k = hashKey.value.trim();
    const v = hashValue.value.trim();
    if (!k) { hashStatus.innerText = "Error: Enter a key."; return; }
    const time = myHash.set(k, v);
    renderHashTable();
    hashStatus.innerText = `Set [ "${k}" ] = "${v}"`;
    hashTime.innerText = fmtTime(time);
    hashKey.value = ''; hashValue.value = ''; hashKey.focus();
});
document.getElementById('hashGetBtn').addEventListener('click', () => {
    const k = hashKey.value.trim();
    if (!k) { hashStatus.innerText = "Error: Enter a key."; return; }
    const { result, time } = myHash.get(k);
    hashTime.innerText = fmtTime(time);
    if (result !== undefined) {
        hashStatus.innerText = `Got [ "${k}" ] = "${result}"`;
        const items = hashDisplay.querySelectorAll('.hash-item');
        items.forEach(item => {
            if (item.dataset.key === k) {
                item.classList.add('hash-highlight');
                setTimeout(() => item.classList.remove('hash-highlight'), 1500);
            }
        });
    } else {
        hashStatus.innerText = `Key [ "${k}" ] not found.`;
    }
});
document.getElementById('hashDeleteBtn').addEventListener('click', () => {
    const k = hashKey.value.trim();
    if (!k) { hashStatus.innerText = "Error: Enter a key."; return; }
    const { result, time } = myHash.delete(k);
    hashTime.innerText = fmtTime(time);
    if (result) {
        renderHashTable();
        hashStatus.innerText = `Deleted [ "${k}" ]`;
    } else {
        hashStatus.innerText = `Key [ "${k}" ] not found.`;
    }
    hashKey.value = '';
});
document.getElementById('hashHasBtn').addEventListener('click', () => {
    const k = hashKey.value.trim();
    if (!k) { hashStatus.innerText = "Error: Enter a key."; return; }
    const { result, time } = myHash.has(k);
    hashTime.innerText = fmtTime(time);
    hashStatus.innerText = result ? `True: [ "${k}" ] exists.` : `False: [ "${k}" ] not found.`;
});
document.getElementById('hashKeysBtn').addEventListener('click', () => {
    const { result, time } = myHash.keys();
    hashTime.innerText = fmtTime(time);
    hashStatus.innerText = result.length ? `Keys: [ ${result.join(', ')} ]` : "No keys stored.";
});
document.getElementById('hashClearBtn').addEventListener('click', () => {
    const time = myHash.clear();
    renderHashTable();
    hashStatus.innerText = "Hash Table cleared.";
    hashTime.innerText = fmtTime(time);
});
hashKey.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('hashSetBtn').click());

// --- TOWER OF HANOI INTERFACE ---
const hanoiLogic = new TowerOfHanoi();
const hanoiStatus = document.getElementById('hanoiStatus');
const hanoiMoveCount = document.getElementById('hanoiMoveCount');
const hanoiTotalMoves = document.getElementById('hanoiTotalMoves');
const hanoiTime = document.getElementById('hanoiTime');
const hanoiSpeedSlider = document.getElementById('hanoiSpeed');
const hanoiSpeedLabel = document.getElementById('hanoiSpeedLabel');
let hanoiRunning = false;
let hanoiRods = { A: [], B: [], C: [] };
let hanoiDiskCount = 0;
hanoiSpeedSlider.addEventListener('input', () => {
    hanoiSpeedLabel.innerText = `${hanoiSpeedSlider.value}ms`;
});
function renderHanoiRod(rodId) {
    const container = document.getElementById(`hanoiDisks${rodId}`);
    container.innerHTML = '';
    const stack = hanoiRods[rodId];
    const maxDisks = hanoiDiskCount || 7;
    const maxWidth = 200;
    const minWidth = 30;
    [...stack].reverse().forEach(disk => {
        const el = document.createElement('div');
        el.className = 'hanoi-disk';
        const ratio = (disk / maxDisks);
        const w = minWidth + ratio * (maxWidth - minWidth);
        el.style.width = `${w}px`;
        el.style.background = `hsl(${(disk * 37) % 360}, 80%, 55%)`;
        el.style.boxShadow = `0 0 10px hsl(${(disk * 37) % 360}, 80%, 55%)`;
        el.innerText = disk;
        container.appendChild(el);
    });
}
function renderHanoi() {
    renderHanoiRod('A');
    renderHanoiRod('B');
    renderHanoiRod('C');
}
function initHanoi(n) {
    hanoiRods = { A: [], B: [], C: [] };
    for (let i = n; i >= 1; i--) hanoiRods.A.push(i);
    hanoiDiskCount = n;
    renderHanoi();
}
document.getElementById('hanoiStartBtn').addEventListener('click', async () => {
    if (hanoiRunning) return;
    const n = parseInt(document.getElementById('hanoiDisks').value);
    if (isNaN(n) || n < 1 || n > 7) { hanoiStatus.innerText = "Error: Enter 1-7 disks."; return; }
    initHanoi(n);
    const { moves, time } = hanoiLogic.solve(n, 'A', 'C', 'B');
    hanoiTime.innerText = fmtTime(time);
    hanoiTotalMoves.innerText = moves.length;
    hanoiMoveCount.innerText = 0;
    hanoiRunning = true;
    hanoiStatus.innerText = "Solving...";
    for (let i = 0; i < moves.length; i++) {
        if (!hanoiRunning) break;
        const { disk, from, to } = moves[i];
        hanoiRods[to].push(hanoiRods[from].pop());
        renderHanoi();
        hanoiMoveCount.innerText = i + 1;
        hanoiStatus.innerText = `Move disk ${disk}: Rod ${from} → Rod ${to}`;
        await sleep(parseInt(hanoiSpeedSlider.value));
    }
    if (hanoiRunning) hanoiStatus.innerText = `Done! ${moves.length} moves for ${n} disks.`;
    hanoiRunning = false;
});
document.getElementById('hanoiResetBtn').addEventListener('click', () => {
    hanoiRunning = false;
    const n = parseInt(document.getElementById('hanoiDisks').value);
    if (!isNaN(n) && n >= 1 && n <= 7) initHanoi(n);
    else { hanoiRods = { A: [], B: [], C: [] }; renderHanoi(); }
    hanoiStatus.innerText = "Reset.";
    hanoiMoveCount.innerText = 0;
    hanoiTotalMoves.innerText = 0;
    hanoiTime.innerText = '-';
});

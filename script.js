class Stack {
    constructor() { this.items = []; }
    push(element) { this.items.push(element); }
    pop() { if (this.isEmpty()) return "Underflow"; return this.items.pop(); }
    peek() { if (this.isEmpty()) return "Empty"; return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
    size() { return this.items.length; }
    clear() { this.items = []; }
}
class Queue {
    constructor() { this.items = []; }
    enqueue(element) { this.items.push(element); }
    dequeue() { if (this.isEmpty()) return "Underflow"; return this.items.shift(); }
    front() { if (this.isEmpty()) return "Empty"; return this.items[0]; }
    rear() { if (this.isEmpty()) return "Empty"; return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
    size() { return this.items.length; }
    clear() { this.items = []; }
}
class LinkedListNode {
    constructor(value) { this.value = value; this.next = null; }
}
class LinkedList {
    constructor() { this.head = null; this.size = 0; }
    add(value) {
        const newNode = new LinkedListNode(value);
        if (!this.head) { this.head = newNode; }
        else { let current = this.head; while (current.next) { current = current.next; } current.next = newNode; }
        this.size++;
    }
    remove(value) {
        if (!this.head) return false;
        if (String(this.head.value) === String(value)) { this.head = this.head.next; this.size--; return true; }
        let current = this.head;
        while (current.next) {
            if (String(current.next.value) === String(value)) { current.next = current.next.next; this.size--; return true; }
            current = current.next;
        }
        return false;
    }
    find(value) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (String(current.value) === String(value)) return index;
            current = current.next;
            index++;
        }
        return -1;
    }
    getSize() { return this.size; }
    clear() { this.head = null; this.size = 0; }
}
class treeNode {
    constructor(value) { this.value = value; this.left = null; this.right = null; }
}
class BinaryTree {
    constructor() { this.root = null; }
    insert(value) {
        const newNode = new treeNode(value);
        if (!this.root) { this.root = newNode; return; }
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) { current.left = newNode; return; }
                current = current.left;
            } else {
                if (!current.right) { current.right = newNode; return; }
                current = current.right;
            }
        }
    }
    find(value) {
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            current = value < current.value ? current.left : current.right;
        }
        return false;
    }
    inorder(node = this.root, result = []) {
        if (node) {
            this.inorder(node.left, result);
            result.push(node.value);
            this.inorder(node.right, result);
        }
        return result;
    }
    preorder(node = this.root, result = []) {
        if (node) {
            result.push(node.value);
            this.preorder(node.left, result);
            this.preorder(node.right, result);
        }
        return result;
    }
    postorder(node = this.root, result = []) {
        if (node) {
            this.postorder(node.left, result);
            this.postorder(node.right, result);
            result.push(node.value);
        }
        return result;
    }
    clear() { this.root = null; }
}
class Graph {
    constructor() { this.adjacencyList = {}; }
    addVertex(vertex) { if (!this.adjacencyList[vertex]) { this.adjacencyList[vertex] = []; return true; } return false; }
    addEdge(v1, v2) {
        if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
            if (!this.adjacencyList[v1].includes(v2)) this.adjacencyList[v1].push(v2);
            if (!this.adjacencyList[v2].includes(v1)) this.adjacencyList[v2].push(v1);
            return true;
        }
        return false;
    }
    removeEdge(v1, v2) {
        if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
            this.adjacencyList[v1] = this.adjacencyList[v1].filter(v => v !== v2);
            this.adjacencyList[v2] = this.adjacencyList[v2].filter(v => v !== v1);
            return true;
        }
        return false;
    }
    removeVertex(vertex) {
        if (this.adjacencyList[vertex]) {
            while (this.adjacencyList[vertex].length) {
                const adjacentVertex = this.adjacencyList[vertex].pop();
                this.removeEdge(vertex, adjacentVertex);
            }
            delete this.adjacencyList[vertex];
            return true;
        }
        return false;
    }
    bfs(startVertex) {
        if (!this.adjacencyList[startVertex]) return [];
        const queue = [startVertex];
        const result = [];
        const visited = {};
        visited[startVertex] = true;
        while(queue.length) {
            const current = queue.shift();
            result.push(current);
            this.adjacencyList[current].forEach(neighbor => {
                if(!visited[neighbor]) { visited[neighbor] = true; queue.push(neighbor); }
            });
        }
        return result;
    }
    dfs(startVertex) {
        if (!this.adjacencyList[startVertex]) return [];
        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;
        (function dfsIter(vertex){
            if(!vertex) return;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if(!visited[neighbor]) dfsIter(neighbor);
            });
        })(startVertex);
        return result;
    }
    clear() { this.adjacencyList = {}; }
}

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
            statusBox.innerText = `${logPrefix}: [${pathArray.slice(0, i+1).join(', ')}]`;
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

//stack intface
const myStack = new Stack();
const stackInput = document.getElementById('stackInput');
const stackDisplay = document.getElementById('stackDisplay');
const stackStatus = document.getElementById('stackStatus');
const stackSize = document.getElementById('stackSize');

function updateStackStatus(message) {
    stackStatus.innerText = message;
    stackSize.innerText = myStack.size();
}
document.getElementById('pushBtn').addEventListener('click', () => {
    if (myStack.size() >= 10) { updateStackStatus("Error: OVERFLOW! Max 10 capacity reached."); return; }

    const val = parseFloat(stackInput.value);
    if (!isNaN(val)) {
        myStack.push(val);
        const newEl = document.createElement('div');
        newEl.className = 'stack-element';
        newEl.innerText = val;
        stackDisplay.appendChild(newEl);
        updateStackStatus(`Pushed [ ${val} ]`);
        stackInput.value = ''; stackInput.focus();
    } else updateStackStatus("Error: Enter numeric value to push.");
});
document.getElementById('popBtn').addEventListener('click', () => {
    if (!myStack.isEmpty()) {
        const topEl = stackDisplay.lastElementChild;
        topEl.classList.add('popping');
        const poppedVal = myStack.pop();
        updateStackStatus(`Popping [ ${poppedVal} ]...`);
        setTimeout(() => {
            if (topEl.parentNode) stackDisplay.removeChild(topEl);
            updateStackStatus(`Popped [ ${poppedVal} ].`);
        }, 400);
    } else updateStackStatus("Error: Stack Underflow.");
});
document.getElementById('peekBtn').addEventListener('click', () => {
    if (!myStack.isEmpty()) {
        const topEl = stackDisplay.lastElementChild;
        topEl.classList.remove('peeking');
        void topEl.offsetWidth;
        topEl.classList.add('peeking');
        updateStackStatus(`Peeking: Top is [ ${myStack.peek()} ].`);
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
    myStack.clear();
    stackDisplay.innerHTML = '';
    updateStackStatus("Stack cleared.");
});
stackInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('pushBtn').click());


//que intface
const myQueue = new Queue();
const queueInput = document.getElementById('queueInput');
const queueDisplay = document.getElementById('queueDisplay');
const queueStatus = document.getElementById('queueStatus');
const queueSize = document.getElementById('queueSize');

function updateQueueStatus(msg) {
    queueStatus.innerText = msg;
    queueSize.innerText = myQueue.size();
}
document.getElementById('enqueueBtn').addEventListener('click', () => {
    if (myQueue.size() >= 10) { updateQueueStatus("Error: Max 10 capacity reached."); return; }

    const val = parseFloat(queueInput.value);
    if (!isNaN(val)) {
        myQueue.enqueue(val);
        const newEl = document.createElement('div');
        newEl.className = 'queue-element';
        newEl.innerText = val;
        queueDisplay.appendChild(newEl);
        updateQueueStatus(`Enqueued [ ${val} ]`);
        queueInput.value = ''; queueInput.focus();
    } else updateQueueStatus("Error: Enter numeric value.");
});
document.getElementById('dequeueBtn').addEventListener('click', () => {
    if (!myQueue.isEmpty()) {
        const frontEl = queueDisplay.firstElementChild;
        frontEl.classList.add('dequeuing');
        const deqVal = myQueue.dequeue();
        updateQueueStatus(`Dequeuing [ ${deqVal} ]...`);
        setTimeout(() => {
            if (frontEl.parentNode) queueDisplay.removeChild(frontEl);
            updateQueueStatus(`Dequeued [ ${deqVal} ].`);
        }, 400);
    } else updateQueueStatus("Error: Queue Underflow.");
});
document.getElementById('frontBtn').addEventListener('click', () => {
    if (!myQueue.isEmpty()) {
        const frontEl = queueDisplay.firstElementChild;
        frontEl.classList.remove('peeking');
        void frontEl.offsetWidth;
        frontEl.classList.add('peeking');
        updateQueueStatus(`Front is [ ${myQueue.front()} ].`);
        setTimeout(() => frontEl.classList.remove('peeking'), 1500);
    } else updateQueueStatus("Error: Queue empty.");
});
document.getElementById('rearBtn').addEventListener('click', () => {
    if (!myQueue.isEmpty()) {
        const rearEl = queueDisplay.lastElementChild;
        rearEl.classList.remove('peeking');
        void rearEl.offsetWidth;
        rearEl.classList.add('peeking');
        updateQueueStatus(`Rear is [ ${myQueue.rear()} ].`);
        setTimeout(() => rearEl.classList.remove('peeking'), 1500);
    } else updateQueueStatus("Error: Queue empty.");
});
document.getElementById('qIsEmptyBtn').addEventListener('click', () => {
    updateQueueStatus(myQueue.isEmpty() ? "True: Queue empty." : `False: Queue has ${myQueue.size()} items.`);
});
document.getElementById('qClearBtn').addEventListener('click', () => {
    myQueue.clear(); queueDisplay.innerHTML = ''; updateQueueStatus("Queue cleared.");
});
queueInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('enqueueBtn').click());


//linkel intface
const myList = new LinkedList();
const listInput = document.getElementById('listInput');
const listDisplay = document.getElementById('listDisplay');
const listStatus = document.getElementById('listStatus');
const listSize = document.getElementById('listSize');

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
        myList.add(val);
        renderList();
        listStatus.innerText = `Added node [ ${val} ]`;
        listInput.value = ''; listInput.focus();
    } else listStatus.innerText = "Error: Enter numeric value.";
});
document.getElementById('removeNodeBtn').addEventListener('click', () => {
    const val = parseFloat(listInput.value);
    if (!isNaN(val)) {
        const idx = myList.find(val);
        if (idx !== -1) {
            const wrapper = listDisplay.children[idx];
            wrapper.classList.add('removing');
            setTimeout(() => {
                myList.remove(val);
                renderList();
                listStatus.innerText = `Removed node [ ${val} ]`;
            }, 400);
        } else listStatus.innerText = "Value not found.";
        listInput.value = '';
    } else listStatus.innerText = "Error: Enter numeric value.";
});
document.getElementById('findNodeBtn').addEventListener('click', () => {
    const val = parseFloat(listInput.value);
    if (!isNaN(val)) {
        const idx = myList.find(val);
        if (idx !== -1) {
            listStatus.innerText = `Found [ ${val} ] at Indx ${idx}`;
            const node = listDisplay.children[idx].querySelector('.list-node');
            node.classList.add('finding');
            setTimeout(() => node.classList.remove('finding'), 2000);
        } else listStatus.innerText = "Value not found.";
    } else listStatus.innerText = "Error: Enter numeric value.";
});
document.getElementById('listClearBtn').addEventListener('click', () => {
    myList.clear(); renderList(); listStatus.innerText = "List cleared.";
});
listInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('addNodeBtn').click());
//tree intface
const myTree = new BinaryTree();
const treeInput = document.getElementById('treeInput');
const treeDisplay = document.getElementById('treeDisplay');
const treeStatus = document.getElementById('treeStatus');
const inorderResultBox = document.getElementById('inorderResultBox');

function renderTree() {
    treeDisplay.innerHTML = '';
    if (!myTree.root) return;
    const rootW = treeDisplay.clientWidth;
    // Recursive render using absolute pos
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
        dNode.dataset.val = node.value; // For finding
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
        myTree.insert(val);
        renderTree();
        treeStatus.innerText = `Inserted [ ${val} ] into BST.`;
        treeInput.value = ''; treeInput.focus();
        inorderResultBox.style.display = 'none';
    } else treeStatus.innerText = "Error: Tree strictly requires numbers.";
});
document.getElementById('findTreeBtn').addEventListener('click', () => {
    const val = parseFloat(treeInput.value);
    if (!isNaN(val)) {
        if (myTree.find(val)) {
            treeStatus.innerText = `Found Node [ ${val} ]!`;
            // Highlight
            const nodes = document.querySelectorAll('.tree-node');
            nodes.forEach(n => {
                if (parseFloat(n.dataset.val) === val) {
                    n.classList.add('finding');
                    setTimeout(() => n.classList.remove('finding'), 2000);
                }
            });
        } else {
            treeStatus.innerText = `Node [ ${val} ] not found.`;
        }
    } else treeStatus.innerText = "Error: Enter a valid number.";
});
document.getElementById('inorderBtn').addEventListener('click', () => {
    treeStatus.innerText = `Inorder Traversal Running...`;
    animatePath(myTree.inorder(), '.tree-node', inorderResultBox, 'Inorder');
});
document.getElementById('preorderBtn').addEventListener('click', () => {
    treeStatus.innerText = `Preorder Traversal Running...`;
    animatePath(myTree.preorder(), '.tree-node', inorderResultBox, 'Preorder');
});
document.getElementById('postorderBtn').addEventListener('click', () => {
    treeStatus.innerText = `Postorder Traversal Running...`;
    animatePath(myTree.postorder(), '.tree-node', inorderResultBox, 'Postorder');
});
document.getElementById('treeClearBtn').addEventListener('click', () => {
    myTree.clear(); renderTree(); treeStatus.innerText = "Tree Cleared."; inorderResultBox.style.display = 'none';
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
                line.setAttribute('x1', vertexCoords[v1].x);
                line.setAttribute('y1', vertexCoords[v1].y);
                line.setAttribute('x2', vertexCoords[v2].x);
                line.setAttribute('y2', vertexCoords[v2].y);
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
        graphDisplay.appendChild(dNode);
    });
}
document.getElementById('addVertexBtn').addEventListener('click', () => {
    if (Object.keys(myGraph.adjacencyList).length >= 10) { graphStatus.innerText = "Error: Max 10 vertices allowed."; return; }
    const v = parseFloat(vInput.value);
    if (!isNaN(v)) {
        if (myGraph.addVertex(v)) {
            const w = graphDisplay.clientWidth;
            const h = graphDisplay.clientHeight;
            vertexCoords[v] = { x: Math.random() * (w - 100) + 50, y: Math.random() * (h - 100) + 50 };
            renderGraph();
            graphStatus.innerText = `Added Vertex [ ${v} ]`;
            vInput.value = ''; vInput.focus();
        } else {
            graphStatus.innerText = `Vertex [ ${v} ] already exists.`;
        }
    } else graphStatus.innerText = "Error: Numeric vertex name required.";
});
document.getElementById('addEdgeBtn').addEventListener('click', () => {
    const v1 = parseFloat(edgeV1.value);
    const v2 = parseFloat(edgeV2.value);
    if (!isNaN(v1) && !isNaN(v2)) {
        if (myGraph.addEdge(v1, v2)) {
            renderGraph();
            graphStatus.innerText = `Added Edge [ ${v1} - ${v2} ]`;
            edgeV1.value = ''; edgeV2.value = '';
        } else {
            graphStatus.innerText = `Ensure both vertices exist!`;
        }
    } else graphStatus.innerText = "Error: Valid edge numbers required.";
});

document.getElementById('removeEdgeBtn').addEventListener('click', () => {
    const v1 = parseFloat(edgeV1.value);
    const v2 = parseFloat(edgeV2.value);
    if (!isNaN(v1) && !isNaN(v2)) {
        if (myGraph.removeEdge(v1, v2)) {
            renderGraph();
            graphStatus.innerText = `Removed Edge [ ${v1} - ${v2} ]`;
        } else {
            graphStatus.innerText = `Edge doesn't exist.`;
        }
    } else graphStatus.innerText = "Error: Valid edge numbers required.";
});



document.getElementById('bfsBtn').addEventListener('click', () => {
    const keys = Object.keys(myGraph.adjacencyList);
    if (!keys.length) { graphStatus.innerText = "Error: Graph is empty."; return; }
    
    const inputVal = parseFloat(vInput.value);
    let startObj = !isNaN(inputVal) && myGraph.adjacencyList[inputVal] ? inputVal : keys[0];
    
    graphStatus.innerText = `BFS Route from [ ${startObj} ]`;
    const graphResultBox = document.getElementById('graphResultBox');
    animatePath(myGraph.bfs(startObj), '.graph-node', graphResultBox, 'BFS Path');
});

document.getElementById('dfsBtn').addEventListener('click', () => {
    const keys = Object.keys(myGraph.adjacencyList);
    if (!keys.length) { graphStatus.innerText = "Error: Graph is empty."; return; }
    
    const inputVal = parseFloat(vInput.value);
    let startObj = !isNaN(inputVal) && myGraph.adjacencyList[inputVal] ? inputVal : keys[0]; 
    graphStatus.innerText = `DFS Route from [ ${startObj} ]`;
    const graphResultBox = document.getElementById('graphResultBox');
    animatePath(myGraph.dfs(startObj), '.graph-node', graphResultBox, 'DFS Path');
});
document.getElementById('graphClearBtn').addEventListener('click', () => {
    myGraph.clear();
    for (let k in vertexCoords) delete vertexCoords[k];
    renderGraph();
    graphStatus.innerText = "Graph Cleared.";
});
vInput.addEventListener('keypress', e => e.key === 'Enter' && document.getElementById('addVertexBtn').click());

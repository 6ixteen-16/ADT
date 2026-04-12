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
class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
        this.nodeCount = 0;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            this.nodeCount++;
            return true;
        }
        let current = this.root;
        while (true) {
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    this.nodeCount++;
                    return true;
                }
                current = current.left;
            } else if (value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    this.nodeCount++;
                    return true;
                }
                current = current.right;
            } else {
                return false;
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

    inorder(node, result) {
        if (node === undefined) node = this.root;
        if (result === undefined) result = [];
        if (node) {
            this.inorder(node.left, result);
            result.push(node.value);
            this.inorder(node.right, result);
        }
        return result;
    }

    preorder(node, result) {
        if (node === undefined) node = this.root;
        if (result === undefined) result = [];
        if (node) {
            result.push(node.value);
            this.preorder(node.left, result);
            this.preorder(node.right, result);
        }
        return result;
    }

    postorder(node, result) {
        if (node === undefined) node = this.root;
        if (result === undefined) result = [];
        if (node) {
            this.postorder(node.left, result);
            this.postorder(node.right, result);
            result.push(node.value);
        }
        return result;
    }
    getSize() {
        return this.nodeCount;
    }
    clear() {
        this.root = null;
        this.nodeCount = 0;
    }
    remove(value) {
        let nodeRemoved = false;

        const removeNode = (node, key) => {
            if (node === null) {
                return null;
            }
            if (key < node.value) {
                node.left = removeNode(node.left, key);
                return node;
            } else if (key > node.value) {
                node.right = removeNode(node.right, key);
                return node;
            } else {
                // Node found
                nodeRemoved = true;

                //no children(Leaf node)
                if (node.left === null && node.right === null) {
                    return null;
                }
                //One child
                if (node.left === null) {
                    return node.right;
                } else if (node.right === null) {
                    return node.left;
                }
                //2 children
                //in-order successor(smallest node in the right subtree)
                let tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.value = tempNode.value; //value replacement
                node.right = removeNode(node.right, tempNode.value);
                return node;
            }
        };
        this.root = removeNode(this.root, value);
        if (nodeRemoved) {
            this.nodeCount--;
        }
        return nodeRemoved;
    }
}
class Graph {
    constructor() {
        this.adjacencyList = {};
        this.vertexCount = 0;
        this.edgeCount = 0;
    }

    addVertex(vertex) {
        if (vertex === null || vertex === undefined) return false;
        vertex = String(vertex);
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
            this.vertexCount++;
            return true;
        }
        return false;
    }

    addEdge(v1, v2) {
        v1 = String(v1);
        v2 = String(v2);

        if (v1 === v2) return false;

        if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
            if (!this.adjacencyList[v1].includes(v2)) {
                this.adjacencyList[v1].push(v2);
                this.adjacencyList[v2].push(v1);
                this.edgeCount++;
                return true;
            }
            return false;
        }
        return false;
    }

    removeEdge(v1, v2) {
        v1 = String(v1);
        v2 = String(v2);

        if (this.adjacencyList[v1] && this.adjacencyList[v2]) {
            const idx1 = this.adjacencyList[v1].indexOf(v2);
            const idx2 = this.adjacencyList[v2].indexOf(v1);

            if (idx1 > -1 && idx2 > -1) {
                this.adjacencyList[v1].splice(idx1, 1);
                this.adjacencyList[v2].splice(idx2, 1);
                this.edgeCount--;
                return true;
            }
        }
        return false;
    }

    removeVertex(vertex) {
        vertex = String(vertex);
        if (this.adjacencyList[vertex]) {
            while (this.adjacencyList[vertex].length) {
                const adjacentVertex = this.adjacencyList[vertex].pop();
                this.removeEdge(vertex, adjacentVertex);
            }
            delete this.adjacencyList[vertex];
            this.vertexCount--;
            return true;
        }
        return false;
    }

    bfs(startVertex) {
        startVertex = String(startVertex);
        if (!this.adjacencyList[startVertex]) return [];

        const queue = [startVertex];
        const result = [];
        const visited = {};
        visited[startVertex] = true;

        while (queue.length) {
            const current = queue.shift();
            result.push(current);

            this.adjacencyList[current].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }

    dfs(startVertex) {
        startVertex = String(startVertex);
        if (!this.adjacencyList[startVertex]) return [];

        const result = [];
        const visited = {};
        const adjacencyList = this.adjacencyList;

        (function dfsIter(vertex) {
            if (!vertex || visited[vertex]) return;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) dfsIter(neighbor);
            });
        })(startVertex);

        return result;
    }

    getVertexCount() {
        return this.vertexCount;
    }

    getEdgeCount() {
        return this.edgeCount;
    }

    clear() {
        this.adjacencyList = {};
        this.vertexCount = 0;
        this.edgeCount = 0;
    }
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
document.getElementById('removeTreeBtn').addEventListener('click', () => {
    const val = parseFloat(treeInput.value);
    if (!isNaN(val)) {
        if (myTree.remove(val)) {
            renderTree();
            treeStatus.innerText = `Removed Node [ ${val} ] from BST.`;
        } else {
            treeStatus.innerText = `Node [ ${val} ] not found.`;
        }
        treeInput.value = '';
        treeInput.focus();
        inorderResultBox.style.display = 'none';
    } else {
        treeStatus.innerText = "Error: Enter a valid number to remove.";
    }
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
    if (myGraph.getVertexCount() >= 10) {
        graphStatus.innerText = "Error: Max 10 vertices allowed.";
        return;
    }
    const v = String(parseFloat(vInput.value) || vInput.value).trim();
    if (v && v !== 'NaN') {
        if (myGraph.addVertex(v)) {
            const w = graphDisplay.clientWidth;
            const h = graphDisplay.clientHeight;
            vertexCoords[v] = {
                x: Math.random() * (w - 100) + 50,
                y: Math.random() * (h - 100) + 50
            };
            renderGraph();
            graphStatus.innerText = `Added Vertex [ ${v} ]`;
            vInput.value = '';
            vInput.focus();
        } else {
            graphStatus.innerText = `Vertex [ ${v} ] already exists.`;
        }
    } else graphStatus.innerText = "Error: Enter a valid vertex name.";
});
document.getElementById('addEdgeBtn').addEventListener('click', () => {
    const v1 = String(parseFloat(edgeV1.value) || edgeV1.value).trim();
    const v2 = String(parseFloat(edgeV2.value) || edgeV2.value).trim();

    if (v1 && v2 && v1 !== 'NaN' && v2 !== 'NaN' && v1 !== v2) {
        if (myGraph.addEdge(v1, v2)) {
            renderGraph();
            graphStatus.innerText = `Added Edge [ ${v1} - ${v2} ]`;
            edgeV1.value = '';
            edgeV2.value = '';
        } else {
            graphStatus.innerText = `Edge already exists or vertices do not exist!`;
        }
    } else graphStatus.innerText = "Error: Enter two different valid vertices.";
});

document.getElementById('removeEdgeBtn').addEventListener('click', () => {
    const v1 = String(parseFloat(edgeV1.value) || edgeV1.value).trim();
    const v2 = String(parseFloat(edgeV2.value) || edgeV2.value).trim();

    if (v1 && v2 && v1 !== 'NaN' && v2 !== 'NaN') {
        if (myGraph.removeEdge(v1, v2)) {
            renderGraph();
            graphStatus.innerText = `Removed Edge [ ${v1} - ${v2} ]`;
        } else {
            graphStatus.innerText = `Edge doesn't exist.`;
        }
    } else graphStatus.innerText = "Error: Enter valid vertices.";
});

document.getElementById('bfsBtn').addEventListener('click', () => {
    const keys = Object.keys(myGraph.adjacencyList);
    if (!keys.length) {
        graphStatus.innerText = "Error: Graph is empty.";
        return;
    }
    const inputVal = String(parseFloat(vInput.value) || vInput.value).trim();
    let startObj = (inputVal && inputVal !== 'NaN' && myGraph.adjacencyList[inputVal]) ? inputVal : keys[0];
    graphStatus.innerText = `BFS Route from [ ${startObj} ]`;
    const graphResultBox = document.getElementById('graphResultBox');
    animatePath(myGraph.bfs(startObj), '.graph-node', graphResultBox, 'BFS Path');
});

document.getElementById('dfsBtn').addEventListener('click', () => {
    const keys = Object.keys(myGraph.adjacencyList);
    if (!keys.length) {
        graphStatus.innerText = "Error: Graph is empty.";
        return;
    }
    const inputVal = String(parseFloat(vInput.value) || vInput.value).trim();
    let startObj = (inputVal && inputVal !== 'NaN' && myGraph.adjacencyList[inputVal]) ? inputVal : keys[0];
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

let draggedVertex = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

graphDisplay.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('graph-node')) {
        draggedVertex = e.target.dataset.v;
        const rect = e.target.getBoundingClientRect();
        const containerRect = graphDisplay.getBoundingClientRect();
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

graphDisplay.addEventListener('mouseleave', () => {
    draggedVertex = null;
});

// Helper for animations
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// --- SORTING IMPLEMENTATION ---
let sortArray = [];
const sortInput = document.getElementById('sortInput');
const sortingDisplay = document.getElementById('sortingDisplay');
const sortStatus = document.getElementById('sortStatus');
const sortSize = document.getElementById('sortSize');
const sortTimeComp = document.getElementById('sortTimeComp');
const sortSpaceComp = document.getElementById('sortSpaceComp');

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
}

async function selectionSort() {
    setSortComplexity('selection');
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
}

async function insertionSort() {
    setSortComplexity('insertion');
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
            document.querySelectorAll('.sort-bar').forEach((b, idx) => {
                if (idx <= i) b.classList.add('sorted');
            });
        }
        sortArray[j + 1] = key;
        updateSortDisplay();
        await sleep(400);
        document.querySelectorAll('.sort-bar').forEach((b, idx) => {
            if (idx <= i) b.classList.add('sorted');
        });
    }
    sortStatus.innerText = "Insertion Sort Complete!";
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
    await Promise.all([
        quickSort(start, index - 1),
        quickSort(index + 1, end)
    ]);
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
document.getElementById('mergeSortBtn').addEventListener('click', () => mergeSort().then(() => {
    sortStatus.innerText = "Merge Sort Complete!";
    document.querySelectorAll('.sort-bar').forEach(b => b.classList.add('sorted'));
}));
document.getElementById('quickSortBtn').addEventListener('click', () => quickSort());


// --- SEARCHING IMPLEMENTATION ---
let searchArray = [];
const searchInput = document.getElementById('searchInput');
const searchTarget = document.getElementById('searchTarget');
const searchingDisplay = document.getElementById('searchingDisplay');
const searchStatus = document.getElementById('searchStatus');
const searchSize = document.getElementById('searchSize');

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
            return;
        }
        boxes[i].classList.remove('checking');
        boxes[i].classList.add('discarded');
    }
    searchStatus.innerText = `${target} not found in array.`;
}

async function binarySearch() {
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
}

document.getElementById('linearSearchBtn').addEventListener('click', linearSearch);
document.getElementById('binarySearchBtn').addEventListener('click', binarySearch);

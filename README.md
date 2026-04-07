# Advanced ADT Visualizer - Architecture & Logic Documentation

This document provides a comprehensive breakdown of the internal logic governing the ADT Visualizer, explaining the purpose of each file and how the entire system connects to create dynamic, real-time algorithmic visualizations.

## 1. System Overview
The application is built entirely on vanilla web technologies (**HTML5**, **CSS3**, **ES6 JavaScript**) without any external dependencies or libraries. It leverages an MVC-like architecture where:
- **Model** is represented by pure JavaScript ES6 Classes (the logical ADTs).
- **View** is represented by the dynamically manipulated DOM (`index.html` & `style.css`).
- **Controller** is the bridge of Event Listeners acting upon the Model and commanding the View to update.

---

## 2. File Breakdown

### `index.html` (The Structure)
This file defines the strict, skeletal layout of the application.
- **Header & Navigation**: A `<nav>` acts as a universal router holding data-targets (like `data-target="view-stack"`). 
- **Tab Layouts**: The document relies on 5 core `<main>` blocks (Stack, Queue, Linked List, Tree, Graph). Only one block receives the `.active` class at a time.
- **Control vs Visualization Zones**: Each `<main>` splits horizontally into two panels using CSS grids:
  - **`.control-panel`**: Holds the numeric input constraints (`type="number"`), triggers (Insert, Pop, BFS), status loggers, and structural property limits limits (e.g., Space/Time Complexity analysis texts).
  - **`.visualizer-panel`**: An empty sandbox uniquely themed (e.g., SVG spaces for Graphs, Flex columns for Stacks) where raw JS structures will be dynamically rendered.

### `style.css` (The Aesthetics & Animation Engine)
Beyond basic colors, this file controls all critical physical layouts, flex limits, and timing execution properties. 
- **Grid Layout Management**: Ensures `.control-panel` and `.visualizer-panel` remain strictly contained using `min-height: 0; height: 100%;` overriding standard grid blowout behaviors.
- **Keyframe Animations**: Controls physical motions heavily relying on CSS variables and transforms.
  - `@keyframes dropIn`: Bounces new stack items organically from the ceiling.
  - `@keyframes shrinkOut`: Eliminates orphaned Linked List nodes visually before garbage collection.
  - `@keyframes pulseVisited`: Visually iterates Algorithm Paths (Pre/Post Order, DFS, BFS) scaling nodes iteratively up and down in a neon wash.

### `script.js` (The Engine & Controller)
The master hub executing computational memory and wiring UI connections tightly together. It is split chronologically into three core parts:

#### A. Core Data Classes
Pure javascript definitions of Data Structures (`class Stack`, `class BinaryTree`, `class Graph`). 
- They strictly manipulate primitive local structures like Arrays (`this.items = []`), Node references (`this.head = null`), and Object Hashmaps (`this.adjacencyList = {}`). 
- They perform advanced operations like `bfs()`, `inorder()`, and `find()`. None of these classes interface with the DOM directly.

#### B. The Router
A highly efficient block of code under `// NAVIGATION` that iterates across all `<button class="nav-btn">` components. When clicked, it hides all DOM elements matching `.main-content` and exclusively toggles `display: grid` on whoever maps to the selected `data-target`.

#### C. Control Binders & Render Functions
The final portion uniquely pairs HTML buttons with JS Class interactions:
- **Limits Check**: Event listeners strictly check conditions beforehand (like `if (myStack.size() >= 10) return;` or `!isNaN(parseFloat())`).
- **State Mutation**: Once safety is verified, the UI logic calls methods on the Class instances (e.g., `myTree.insert(val)`).
- **Render Propagation**: After memory is updated, DOM render functions visually sync the two. Simple systems (Stack) just `appendChild()` a new div, whereas complex systems (Graph, Tree), run a full `renderGraph()` recalculation deleting the existing tree visuals and recursively dropping elements at distinct calculated `(x,y)` absolute positions or mapping new SVG collision boxes. 

---

## 3. How It All Connects (Execution Flow)
If you were to input a `5` and click **"Insert"** on the Binary Tree, the connection pipeline executes exactly as follows:

1. **User (HTML)**: User interacts with the active tree tab on `index.html`.
2. **Listener (JS)**: The click is captured by `document.getElementById('insertTreeBtn')`.
3. **Validation (JS)**: The listener verifies `treeInput.value` is purely numerical and that `document.querySelectorAll('.tree-node').length` is below the maximum 10-node capacity limit.
4. **Data Logic (JS Model)**: The system passes the clean value down dynamically to `myTree.insert(5)`. The local instance computes depth placement structurally in memory.
5. **View Update (JS Controller -> CSS)**: `renderTree()` fires. It deletes the previous render, recursively loops through the new logical tree from step 4, calculates exact absolute mapping boundaries for CSS, and re-draws new `<div class="tree-node"></div>` properties.
6. **Polishing (JS + CSS)**: The status box writes *"Inserted [ 5 ]"*, and the new DOM elements naturally pop into UI existence triggering `style.css` `@keyframes popIn` on spawn.
# ADT

# Tree Visualizer

A simple Next.js application that allows users to input a tree in level order and visualize the tree structure. Users can also perform different tree traversals and see the traversal animations.

## Features

- Input tree data in level order format.
- Visualize the tree structure.
- Perform and animate different tree traversals (Inorder, PreOrder, PostOrder, Level Order).
- Responsive design with animated transitions.

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ASWINKMANOJ/Binarytree-Traversal-Visualization.git
   cd Binarytree-Traversal-Visualization
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000`.

## Usage

### Input the Tree

1. Enter the tree nodes in level order format in the input field (e.g., `7,5,9,2,6,8,11`).
2. Click the "Submit" button to visualize the tree.

### Tree Traversals

- **Inorder Traversal**: Click the "Inorder Traversal" button to perform an inorder traversal.
- **PreOrder Traversal**: Click the "PreOrder Traversal" button to perform a preorder traversal.
- **PostOrder Traversal**: Click the "PostOrder Traversal" button to perform a postorder traversal.
- **Level Traversal**: Click the "Level Traversal" button to perform a level order traversal.

### Create a New Tree

- Click the "Create new Tree" button to input a new tree.

## Components

### Home Component

- Handles the input and submission of tree data.
- Displays an alert if the input is empty.

### TreePage Component

- Visualizes the tree structure using `react-d3-tree`.
- Provides buttons to perform different tree traversals.
- Animates the traversal process using `framer-motion`.

function inorderTraversal(node, result = []) {
  if (!node) return result;
  if (node.children && node.children[0])
    inorderTraversal(node.children[0], result);
  result.push(node.name);
  if (node.children && node.children[1])
    inorderTraversal(node.children[1], result);
  return result;
}

function preOrderTraversal(node, result = []) {
  if (!node) return result;
  result.push(node.name); // Visit the current node
  if (node.children && node.children[0])
    preOrderTraversal(node.children[0], result);
  if (node.children && node.children[1])
    preOrderTraversal(node.children[1], result);
  return result;
}

function postOrderTraversal(node, result = []) {
  if (!node) return result;
  if (node.children && node.children[0])
    postOrderTraversal(node.children[0], result);
  if (node.children && node.children[1])
    postOrderTraversal(node.children[1], result);
  result.push(node.name); // Visit the current node
  return result;
}

function levelOrderTraversal(node, result = []) {
  if (!node) return result;

  let queue = [node];
  while (queue.length > 0) {
    let currentNode = queue.shift(); // Dequeue the front node
    result.push(currentNode.name); // Visit the current node

    // Enqueue left child
    if (currentNode.children && currentNode.children[0]) {
      queue.push(currentNode.children[0]);
    }

    // Enqueue right child
    if (currentNode.children && currentNode.children[1]) {
      queue.push(currentNode.children[1]);
    }
  }

  return result;
}

module.exports = {
  inorderTraversal,
  preOrderTraversal,
  postOrderTraversal,
  levelOrderTraversal,
};

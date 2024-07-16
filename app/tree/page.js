"use client";
import { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import {
  inorderTraversal,
  preOrderTraversal,
  postOrderTraversal,
  levelOrderTraversal,
} from "./traversals";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { motion, animate, AnimatePresence } from "framer-motion";
export default function TreePage() {
  const router = useRouter();
  const [running, setRunning] = useState(false);
  const [chart, setChart] = useState(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [traversedNodes, setTraversedNodes] = useState([]);
  const [highlightedNode, setHighlightedNode] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setChart(JSON.parse(data));
    }
    const dimensions = document
      .getElementById("treeWrapper")
      .getBoundingClientRect();
    setTranslate({
      x: dimensions.width / 2,
      y: dimensions.height / 6,
    });
  }, []);

  const handleTraversalIn = async () => {
    if (!running) {
      setTraversedNodes([]);
      const result = inorderTraversal(chart);
      setRunning(true);
      for (let i = 0; i < result.length; i++) {
        setHighlightedNode(result[i]);
        setTraversedNodes((prev) => [...prev, result[i]]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setHighlightedNode(null);
      setRunning(false);
    }
  };

  const handleTraversalPre = async () => {
    if (!running) {
      setTraversedNodes([]);
      setRunning(true);
      const result = preOrderTraversal(chart);
      for (let i = 0; i < result.length; i++) {
        setHighlightedNode(result[i]);
        setTraversedNodes((prev) => [...prev, result[i]]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setHighlightedNode(null);
      setRunning(false);
    }
  };

  const handleTraversalPost = async () => {
    if (!running) {
      setTraversedNodes([]);
      setRunning(true);
      const result = postOrderTraversal(chart);
      for (let i = 0; i < result.length; i++) {
        setHighlightedNode(result[i]);
        setTraversedNodes((prev) => [...prev, result[i]]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setHighlightedNode(null);
      setRunning(false);
    }
  };

  const handleTraversalLevel = async () => {
    if (!running) {
      setTraversedNodes([]);
      const result = levelOrderTraversal(chart);
      setRunning(true);
      for (let i = 0; i < result.length; i++) {
        setHighlightedNode(result[i]);
        setTraversedNodes((prev) => [...prev, result[i]]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setHighlightedNode(null);
      setRunning(false);
    }
  };

  const renderCustomNodeElement = ({ nodeDatum }) => (
    <g>
      <circle
        r="15"
        fill={nodeDatum.name === highlightedNode ? "yellow" : "white"}
        className="text-center transition-all duration-200 ease-in-out"
      ></circle>
      <text fill="black" x="-5" dy=".35em">
        {nodeDatum.name}
      </text>
    </g>
  );

  return (
    <div className="h-full py-4 px-2 w-full flex flex-col items-center justify-center bg-white">
      <div className="mb-4">
        <motion.button
          onClick={handleTraversalIn}
          className={cn(
            running
              ? "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2 cursor-not-allowed"
              : "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2"
          )}
          whileHover={{
            scale: 1.1,
          }}
        >
          Inorder Traversal
        </motion.button>
        <motion.button
          onClick={handleTraversalPre}
          className={cn(
            running
              ? "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2 cursor-not-allowed"
              : "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2"
          )}
          whileHover={{
            scale: 1.1,
          }}
        >
          PreOrder Traversal
        </motion.button>
        <motion.button
          onClick={handleTraversalPost}
          className={cn(
            running
              ? "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2 cursor-not-allowed"
              : "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2"
          )}
          whileHover={{
            scale: 1.1,
          }}
        >
          PostOrder Traversal
        </motion.button>
        <motion.button
          onClick={handleTraversalLevel}
          className={cn(
            running
              ? "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2 cursor-not-allowed"
              : "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2"
          )}
          whileHover={{
            scale: 1.1,
          }}
        >
          Level Traversal
        </motion.button>
        <motion.button
          onClick={() => {
            if (!running) {
              router.push("/");
            }
          }}
          className={cn(
            running
              ? "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2 cursor-not-allowed"
              : "px-4 py-2 bg-blue-500 text-white rounded mx-2 my-2"
          )}
          whileHover={{
            scale: 1.1,
          }}
        >
          Create new Tree
        </motion.button>
      </div>
      <div
        id="treeWrapper"
        className="h-[35rem] w-full flex items-center justify-center"
      >
        {chart && (
          <Tree
            data={chart}
            orientation="vertical"
            translate={translate}
            nodeSize={{ x: 100, y: 100 }}
            renderCustomNodeElement={renderCustomNodeElement}
            className="transition-all duration-200 ease-in-out"
          />
        )}
      </div>
      <div className="mt-4 p-4 border rounded w-1/2 text-center text-black mb-1">
        Traversed Node:{" "}
        <div className="flex items-center justify-center overflow-x-scroll pl-8 overflow-y-hidden">
          <AnimatePresence>
            {traversedNodes.map((nodes, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, y: 100 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: 100 }}
                layout
                className="py-1 px-2 ml-1 bg-blue-500 rounded-md"
              >
                {nodes}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

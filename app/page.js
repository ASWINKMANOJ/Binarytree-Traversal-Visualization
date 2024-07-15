"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const AlertComponent = () => {
  return (
    <Alert>
      <AlertTitle className="text-red-600">
        There must be one element in the tree
      </AlertTitle>
      <AlertDescription className="text-red-600">
        You cannot create an empty tree. Please add one item using the input.
      </AlertDescription>
    </Alert>
  );
};

export default function Home() {
  const router = useRouter();
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState("");

  function convertToTree(levelOrder) {
    if (!levelOrder.length) return null;

    const values = levelOrder.split(",").map((val) => val.trim());
    const root = { name: values[0], children: [] };
    const queue = [root];

    let index = 1;

    while (index < values.length) {
      const current = queue.shift();

      const leftChild = { name: values[index], children: [] };
      current.children.push(leftChild);
      queue.push(leftChild);
      index++;

      if (index < values.length) {
        const rightChild = { name: values[index], children: [] };
        current.children.push(rightChild);
        queue.push(rightChild);
        index++;
      }
    }

    return root;
  }

  function handleSubmit() {
    if (data !== "") {
      const treeObject = convertToTree(data);
      localStorage.setItem("data", JSON.stringify(treeObject));
      router.push("/tree");
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }

  function handleInput(e) {
    setData(e.target.value);
    setAlert(false);
  }

  function handleEnter(e) {
    if (e.key == "Enter") {
      handleSubmit();
    }
  }

  return (
    <div className="h-screen py-2 px-2 w-full flex flex-col items-center justify-center bg-white relative">
      <div className="h-3/4 w-2/5 flex items-center justify-center flex-col">
        <h1 className="text-xl font-semibold my-4">
          Input the Tree in level order:
        </h1>
        <Input
          type="text"
          value={data}
          onChange={handleInput}
          placeholder="7,5,9,2,6,8,11..."
          className="text-xl my-4"
          onKeyPress={handleEnter}
        />
        <Button
          className="my-3"
          onClick={handleSubmit}
          disabled={setAlert ? false : true}
        >
          Submit
        </Button>
        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="absolute top-0 right-[width-1/2] my-2"
            >
              <AlertComponent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

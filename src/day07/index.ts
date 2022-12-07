import run from "aocrunner";
import { Dir } from "fs";

const parseInput = (rawInput: string) => rawInput;


class DirectoryTreeNode {
  path: string;
  parent: DirectoryTreeNode | undefined;
  children: DirectoryTreeNode[] = [];
  size: number = 0;

  constructor(path: string) {
    this.path = path;
  }

  addChild(child: DirectoryTreeNode) {
    this.children.push(child);
  }

  addFileSize(fileSize: number) {
    this.size += fileSize;
  }

  getTotalSize() {
    let total = 0;
    for(let child of this.children) {
      total += child.getTotalSize();
    }
    total += this.size;
    return total;
  }
}

const getSumOfTotalSizeLimit = (rootNode: DirectoryTreeNode, sizeLimit: number = 100000) => {
  let total = 0;

  for(let child of rootNode.children) {
    total += getSumOfTotalSizeLimit(child)!;
  }
  if(rootNode.getTotalSize() <= sizeLimit) {
    total += rootNode.getTotalSize();
  }

  return total;
}



const createFileSystem = (input: string) => {
  const outputs = input.split("\n");

  const root = new DirectoryTreeNode("/");
  let currentDir = root;

  for(let output of outputs) {

    if(output.endsWith("/")) {
      continue;
    }

    const words = output.split(" ");
    if(words[0] === "dir" || words[1] === "ls") {
      continue;
    }
    if(words[0] === "$" && words[1] === "cd") {
      if(words[2] === "..") {
        currentDir = currentDir.parent!;
        continue;
      }
      const newDir = new DirectoryTreeNode(words[2]);
      currentDir.addChild(newDir);
      newDir.parent = currentDir;
      currentDir = newDir;
      continue;
    }

    currentDir.addFileSize(Number(words[0]));
  }
  return root;
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const root = createFileSystem(input);
  return getSumOfTotalSizeLimit(root).toString();
};



const smallestDirSizeToDelete = (rootNode: DirectoryTreeNode, minimumToDelete: number) => {
  let smallest = Number.MAX_SAFE_INTEGER;
  for(let children of rootNode.children) {
    smallest = Math.min(smallest, smallestDirSizeToDelete(children, minimumToDelete));
  }
  if(rootNode.getTotalSize() > minimumToDelete) {
    smallest = Math.min(smallest, rootNode.getTotalSize());
  }
  
  return smallest;
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const root = createFileSystem(input);

  const freeSpace =  70000000 - root.getTotalSize();
  const minimumSizeToFreeForRun = 30000000 - freeSpace;
  
  const smallest = smallestDirSizeToDelete(root,  minimumSizeToFreeForRun);
  return smallest.toString();
};

run({
  part1: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
        `,
        expected: "95437"
      }
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
        `,
        expected: "24933642"
      }
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

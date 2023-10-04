import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Node {
    id: string;
    name: string;
    children?: Node[];
}

export interface TreeState {
    treeData: Node[];
    errorMessage: string | null;
}

const initialState: TreeState = {
    treeData: [
        {
            id: "root",
            name: "Parent",
            children: [
                {
                    id: "1",
                    name: "Child - 1",
                },
                {
                    id: "3",
                    name: "Child - 3",
                    children: [
                        {
                            id: "4",
                            name: "Child - 4",
                        },
                    ],
                },
            ],
        },
    ],
    errorMessage: null
};

const treeSlice = createSlice({
    name: "tree",
    initialState,
    reducers: {
        deleteNode: (state, action: PayloadAction<string>) => {
            const nodeId = action.payload;
            state.treeData = deleteNodeFromTree(state.treeData, nodeId);
        },
        addNode: (state, action: PayloadAction<{ parentId: string; newNode: Node }>) => {
            const { parentId, newNode } = action.payload;
            state.treeData = addNodeToTree(state.treeData, parentId, newNode);
        },
        renameNode: (state, action: PayloadAction<{ nodeId: string; newName: string }>) => {
            const { nodeId, newName } = action.payload;
            state.treeData = renameNodeInTree(state.treeData, nodeId, newName);
        },
    },
});

// Helper functions to update the tree data
export const checkIfNodeHasChildren = (treeData: Node[], nodeId: string): boolean => {
    const findNode = (nodes: Node[]): boolean => {
        for (const node of nodes) {
            if (node.id === nodeId && node.children && node.children.length > 0) {
                return true;
            }
            if (node.children && findNode(node.children)) {
                return true;
            }
        }
        return false;
    };

    return findNode(treeData);
};

const deleteNodeFromTree = (treeData: Node[], nodeId: string): Node[] => {
    const hasChildren = treeData.some(node => node.id === nodeId && node.children);
    if (hasChildren) {
        return treeData.map(node => node.id === nodeId ? { ...node, errorMessage: "You have to delete all children nodes first" } : node);
    }

    return treeData.flatMap(node => {
        if (node.id === nodeId) {
            return [];
        } else if (node.children) {
            return [
                {
                    ...node,
                    children: deleteNodeFromTree(node.children, nodeId),
                },
            ];
        }
        return [node];
    });
};

const addNodeToTree = (treeData: Node[], parentId: string, newNode: Node): Node[] => {
    return treeData.map((node) => {
        if (node.id === parentId) {
            if (node.children) {
                return {
                    ...node,
                    children: [...node.children, newNode],
                };
            } else {
                return {
                    ...node,
                    children: [newNode],
                };
            }
        } else if (node.children) {
            return {
                ...node,
                children: addNodeToTree(node.children, parentId, newNode),
            };
        }
        return node;
    });
};

const renameNodeInTree = (treeData: Node[], nodeId: string, newName: string): Node[] => {
    return treeData.map((node) => {
        if (node.id === nodeId) {
            return {
                ...node,
                name: newName,
            };
        } else if (node.children) {
            return {
                ...node,
                children: renameNodeInTree(node.children, nodeId, newName),
            };
        }
        return node;
    });
};

export const { deleteNode, addNode, renameNode } = treeSlice.actions;

export const selectTreeData = (state: RootState) => state.tree.treeData;

export default treeSlice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface Node {
    id: string;
    name: string;
    children?: Node[];
}
export interface TreeState {
    treeData: Node[];
    errorMessage: string | null;
}
export const treeSlice = createSlice({
    name: "tree",
    initialState: {
        treeData: [],
        errorMessage: null,
    } as TreeState,
    reducers: {
        setTreeData: (state, action) => {
            return state.treeData = action.payload;
        },
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
    const hasChildren = treeData.some((node) => node.id === nodeId && node.children);
    if (hasChildren) {
        return treeData.map((node) =>
            node.id === nodeId ? { ...node, errorMessage: "You have to delete all children nodes first" } : node
        );
    }

    return treeData.flatMap((node) => {
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

export const { setTreeData } = treeSlice.actions;
export default treeSlice.reducer;
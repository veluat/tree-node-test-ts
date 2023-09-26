import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface Node {
    id: string;
    name: string;
    children?: Node[];
}

interface TreeState {
    treeData: Node[];
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
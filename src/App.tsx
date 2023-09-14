import { Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React from "react";
import { TreeView } from "@mui/x-tree-view";
import { TreeComponent } from "./TreeComponent";
import { selectTreeData } from "./treeSlice";
import { useSelector } from "react-redux";

export type TreeNodeType = {
    id: string;
    name: string;
    parentId?: string;
    children?: TreeNodeType[];
};

export function App() {
    const treeData = useSelector(selectTreeData);

    return (
        <Box sx={{ height: '100vh', width: '100vw' }}>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {treeData.map((el: TreeNodeType) => (
                    <TreeComponent key={el.id.toString()} nodes={el} isRoot nodeId={el.id.toString()} />
                ))}
            </TreeView>
        </Box>
    );
}
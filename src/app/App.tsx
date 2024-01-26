import {Box} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import React, {useEffect, useState} from "react";
import {TreeView} from "@mui/x-tree-view";
import {setTreeData} from "../services/treeSlice";
import {useDispatch, useSelector} from "react-redux";
import {Tree} from "../components/Tree";
import {useGetTreeMutation} from "../services/api";
import {RootState} from "./store";

export type TreeNodeType = {
    id: string;
    name: string;
    parentId?: string;
    children?: TreeNodeType[];
};

export function App() {

    const dispatch = useDispatch();

    const [getTree, {isLoading, error}] = useGetTreeMutation();

    const treeData = useSelector((state: RootState) => state.tree.treeData);

    const [appError, setAppError] = useState<string | null>(null);

    useEffect(() => {
        getTree("ExampleTree")
            .unwrap()
            .then((responseData) => {
                dispatch(setTreeData(responseData));
            })
            .catch((error) => {
                if (error.data) {
                    setAppError(error.data.message);
                } else {
                    setAppError(error.toString());
                }
            });
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {appError}</div>
    }
    return (
        <Box sx={{height: '100vh', width: '100vw'}}>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {treeData.map((el: TreeNodeType) => (
                    <Tree key={el.id.toString()} nodes={el} isRoot nodeId={el.id.toString()}/>
                ))}
            </TreeView>
        </Box>
    );
}
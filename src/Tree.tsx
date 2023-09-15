import { TreeItem } from "@mui/x-tree-view";
import { ControlPanel } from "./ControlPanel";
import { TreeNodeType } from "./App";
import React, { useEffect, useRef, useState } from "react";

interface TreeProps {
    nodes: TreeNodeType;
    isRoot: boolean;
    nodeId: string;
    parentId?: string
}

export const Tree: React.FC<TreeProps> = ({
                                              nodes,
                                              isRoot,
                                              nodeId,
                                              parentId
                                          }) => {
    const [activeItem, setActiveItem] = useState<string | null>(null);
    const nodeRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            activeItem &&
            nodeRef.current &&
            !nodeRef.current.contains(event.target as Node)
        ) {
            setActiveItem(null);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [activeItem]);

    return (
        <div>
            <TreeItem
                key={nodes.id}
                nodeId={nodes.id}
                label={
                    <div style={{ display: "flex", alignItems: "center" }} ref={nodeRef}>
                        {nodes.name}
                        {activeItem === nodes.id ? (
                            <ControlPanel isRoot={isRoot} nodeName={nodes.name} nodeId={nodeId} />
                        ) : null}
                    </div>
                }
                onClick={() => handleItemClick(nodes.id)}
            >
                {Array.isArray(nodes.children)
                    ? nodes.children.map((child) => (
                        <Tree
                            key={child.id}
                            nodes={child}
                            isRoot={false}
                            nodeId={child.id}
                            parentId={nodes.id}
                        />
                    ))
                    : null}
            </TreeItem>
        </div>
    );
}
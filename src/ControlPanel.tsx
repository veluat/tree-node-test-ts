import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useState } from "react";
import { Modal } from "./Modal";

interface ControlPanelProps {
    nodeName?: string;
    isRoot?: boolean;
    nodeId?: string
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
                                                              nodeName = '',
                                                              isRoot,
                                                              nodeId
                                                          }) => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("Add");
    const [label, setLabel] = useState("Node Name");

    const handleClickOpen = (title: string, label: string) => {
        setOpen(true);
        setTitle(title);
        setLabel(label);
    };

    return (
        <div style={{ display: "flex", justifyContent: "end" }}>
            <div>
                <AddCircleOutlineIcon
                    color="primary"
                    style={{ marginLeft: "5px" }}
                    onClick={() => handleClickOpen("Add", "Node Name")}
                />
            </div>
            {!isRoot ? (
                <>
                    <div>
                        <DriveFileRenameOutlineIcon
                            color="primary"
                            style={{ marginLeft: "5px" }}
                            onClick={() => handleClickOpen("Rename", "New Node Name")}
                        />
                    </div>
                    <div>
                        <DeleteForeverIcon
                            color="error"
                            style={{ marginLeft: "5px" }}
                            onClick={() =>
                                handleClickOpen("Delete", `Do you want to delete ${nodeName}?`)
                            }
                        />
                    </div>
                </>
            ) : null}
            {open && (
                <Modal
                    open={open}
                    setOpen={setOpen}
                    title={title}
                    label={label}
                    nodeName={nodeName}
                    nodeId={nodeId}
                />
            )}
        </div>
    );
};
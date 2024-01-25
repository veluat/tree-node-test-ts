import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export interface Node {
    id: string;
    name: string;
    children?: Node[];
}

interface GetTreeResponse {
    id: number;
    name: string;
    children: Node[];
}

interface CreateNodeRequest {
    treeName: string;
    parentNodeId: string;
    nodeName: string;
}

interface RenameNodeRequest {
    treeName: string;
    nodeId: string;
    newNodeName: string;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://test.vmarmysh.com',
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getTree: builder.mutation<GetTreeResponse, string>({
            query: (treeName) => ({
                url: "/api.user.tree.get",
                method: "POST",
                body: {treeName},
            }),
        }),
        createNode: builder.mutation<void, CreateNodeRequest>({
            query: (requestData) => ({
                url: "/api.user.tree.node.create",
                method: "POST",
                body: requestData,
            }),
        }),
        deleteNode: builder.mutation<void, string>({
            query: (nodeId) => ({
                url: "/api.user.tree.node.delete",
                method: "POST",
                body: {nodeId},
            }),
        }),
        renameNode: builder.mutation<void, RenameNodeRequest>({
            query: (requestData) => ({
                url: "/api.user.tree.node.rename",
                method: "POST",
                body: requestData,
            }),
        }),
    }),
});

export const {useGetTreeMutation, useCreateNodeMutation, useDeleteNodeMutation, useRenameNodeMutation} = api;
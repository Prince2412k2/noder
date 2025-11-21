"use client"

import { BaseExecutionNode } from "../base-execution-node"
import { useReactFlow, type Node, type NodeProps } from "@xyflow/react"
import { GlobeIcon } from "lucide-react"
import { memo, useEffect, useState } from "react"
import { HttpRequestFormValues, HttpRequestDialog } from "./dialog"

type HttpRequestsNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
}

type HttpRequestsNodeType = Node<HttpRequestsNodeData>;

export const HttpRequestsNode = memo((props: NodeProps<HttpRequestsNodeType>) => {
  const [dialogOpen, setDialogOpen] = useState(false);


  const { setNodes } = useReactFlow();
  const nodeStatus = "initial";

  const handleOpenSettings = () => setDialogOpen(true);

  const handlSubmit = (values: HttpRequestFormValues) => {

    setNodes((nodes) => nodes.map((node) => {
      if (node.id === props.id) {
        return {
          ...node,
          data: {
            ...node.data,
            ...values
          }
        }
      }
      return node
    }))
  };


  const nodeData = props.data;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"} : ${nodeData.endpoint}` : "Not configured";
  return (
    <>

      <HttpRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handlSubmit}
        defaultEndpoint={nodeData.endpoint} //TODO: just add initial values
        defaultMethod={nodeData.method}
        defaultBody={nodeData.body}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        status={nodeStatus}
        description={description}
        onSesttings={handleOpenSettings}
        onDoubleClick={handleOpenSettings} />
    </>
  )
})


HttpRequestsNode.displayName = "HttpRequestsNode";

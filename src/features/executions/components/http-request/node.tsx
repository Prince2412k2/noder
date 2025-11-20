"use client"

import { BaseExecutionNode } from "../base-execution-node"
import type { Node, NodeProps } from "@xyflow/react"
import { GlobeIcon } from "lucide-react"
import { memo } from "react"

type HttpRequestsNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
}

type HttpRequestsNodeType = Node<HttpRequestsNodeData>;

export const HttpRequestsNode = memo((props: NodeProps<HttpRequestsNodeType>) => {
  const nodeData = props.data as HttpRequestsNodeData;
  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"} : ${nodeData.endpoint}` : "Not configured";

  return (
    <>
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        description={description}
        onSesttings={() => { }}
        onDoubleClick={() => { }} />
    </>
  )
})


HttpRequestsNode.displayName = "HttpRequestsNode";

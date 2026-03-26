"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { SettingsIcon, TrashIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "./ui/button";

interface WorkflowNodeProps {
  children: ReactNode;
  showToolbar?: boolean;
  onDelete?: () => void;
  onSettings?: () => void;
  name?: string;
  description?: string;
};

export function WorkflowNode({
  children,
  showToolbar = true,
  onDelete,
  onSettings,
  name,
  description,
}: WorkflowNodeProps) {

  const [isActive , setIsActive] = useState(true);

  function handleToggleNodeActive(){
    setIsActive(isActive=>!isActive);
  }
  return (
    <>
      {showToolbar && (
       
        <NodeToolbar className="flex gap-2">
          <Button className="w-8 h-8 bg-[#2D2D2E] hover:bg-[#3e3e3e] border border-[#5b5b5b] rounded flex items-center justify-center text-white transition-[color,background-color,transform] duration-100 ease-out active:scale-[0.95]" onClick={onSettings} title="Settings" aria-label="Configure node">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 18 18">
              <path opacity="0.4" d="M9.433 8.25H12.1541C11.8135 6.8198 10.5328 5.75 9 5.75C8.6769 5.75 8.371 5.8118 8.0762 5.8999L9.433 8.25Z" fill="currentColor"></path>
              <path opacity="0.4" d="M9.4331 9.75L8.0766 12.1001C8.3713 12.1882 8.6771 12.25 9.0001 12.25C10.5329 12.25 11.8135 11.1802 12.1542 9.75H9.4331Z" fill="currentColor"></path>
              <path opacity="0.4" d="M6.77409 6.64429C6.14689 7.23729 5.75009 8.0708 5.75009 9C5.75009 9.9292 6.14709 10.7629 6.77439 11.356L8.13419 9L6.77409 6.64429Z" fill="currentColor"></path>
              <path d="M16.2501 8.25H15.2007C15.1289 7.6531 14.976 7.08111 14.7476 6.54761L15.6539 6.02441C16.0128 5.81741 16.1353 5.3589 15.9283 5C15.7208 4.6401 15.2618 4.51859 14.9039 4.72559L13.9904 5.2529C13.636 4.7822 13.2179 4.364 12.7471 4.0097L13.2744 3.0961C13.4814 2.7372 13.3589 2.27869 13 2.07169C12.6426 1.86519 12.1821 1.9867 11.9756 2.3461L11.4523 3.25229C10.919 3.02399 10.3468 2.87119 9.75001 2.79919V1.74991C9.75001 1.33581 9.41411 0.999908 9.00001 0.999908C8.58591 0.999908 8.25001 1.33581 8.25001 1.74991V2.79919C7.65311 2.87119 7.08101 3.02409 6.54771 3.25229L6.02441 2.3461C5.81741 1.9867 5.35891 1.86509 5.00001 2.07169C4.64111 2.27869 4.51861 2.7372 4.72561 3.0961L5.25291 4.0097C4.78211 4.3639 4.36401 4.7822 4.00961 5.2529L3.09611 4.72559C2.73771 4.51859 2.27871 4.6402 2.07171 5C1.86471 5.3589 1.98721 5.81741 2.34611 6.02441L3.25241 6.54761C3.02401 7.08101 2.87121 7.6531 2.79931 8.25H1.74991C1.33581 8.25 0.999908 8.5859 0.999908 9C0.999908 9.4141 1.33581 9.75 1.74991 9.75H2.79931C2.87111 10.3469 3.02401 10.9189 3.25241 11.4524L2.34611 11.9756C1.98721 12.1826 1.86471 12.6411 2.07171 13C2.21041 13.2407 2.46281 13.375 2.72161 13.375C2.84901 13.375 2.97791 13.3428 3.09611 13.2744L4.00961 12.7471C4.36401 13.2178 4.78211 13.636 5.25291 13.9903L4.72561 14.9039C4.51861 15.2628 4.64111 15.7213 5.00001 15.9283C5.11821 15.9967 5.2471 16.0289 5.3745 16.0289C5.6333 16.0289 5.88571 15.8946 6.02441 15.6539L6.54771 14.7477C7.08101 14.976 7.65321 15.1288 8.25001 15.2008V16.2501C8.25001 16.6642 8.58591 17.0001 9.00001 17.0001C9.41411 17.0001 9.75001 16.6642 9.75001 16.2501V15.2008C10.3469 15.1288 10.919 14.9759 11.4523 14.7477L11.9756 15.6539C12.1143 15.8946 12.3667 16.0289 12.6255 16.0289C12.7529 16.0289 12.8818 15.9967 13 15.9283C13.3589 15.7213 13.4814 15.2628 13.2744 14.9039L12.7471 13.9903C13.2179 13.6361 13.636 13.2178 13.9904 12.7471L14.9039 13.2744C15.0221 13.3428 15.151 13.375 15.2784 13.375C15.5372 13.375 15.7896 13.2407 15.9283 13C16.1353 12.6411 16.0128 12.1826 15.6539 11.9756L14.7476 11.4524C14.976 10.919 15.1288 10.3469 15.2007 9.75H16.2501C16.6642 9.75 17.0001 9.4141 17.0001 9C17.0001 8.5859 16.6642 8.25 16.2501 8.25ZM9.00011 13.75C6.38101 13.75 4.25011 11.6191 4.25011 9C4.25011 6.3809 6.38101 4.25 9.00011 4.25C11.6192 4.25 13.7501 6.3809 13.7501 9C13.7501 11.6191 11.6192 13.75 9.00011 13.75Z" fill="currentColor"></path>
            </svg>
          </Button>
          <button className="w-8 h-8 bg-[#2D2D2E] hover:bg-[#3e3e3e] border border-[#5b5b5b] rounded flex items-center justify-center text-white transition-[color,background-color,transform] duration-100 ease-out active:scale-[0.95]" onClick={onDelete} title="Delete" aria-label="Delete node">
            <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 18 18">
              <path opacity="0.4" d="M3.40771 5L3.90253 14.3892C3.97873 15.8531 5.18472 17 6.64862 17H11.3527C12.8166 17 14.0226 15.853 14.0988 14.3896L14.5936 5H3.40771Z" fill="currentColor"></path>
              <path d="M15.25 4H12V2.75C12 1.7852 11.2148 1 10.25 1H7.75C6.7852 1 6 1.7852 6 2.75V4H2.75C2.3359 4 2 4.3359 2 4.75C2 5.1641 2.3359 5.5 2.75 5.5H15.25C15.6641 5.5 16 5.1641 16 4.75C16 4.3359 15.6641 4 15.25 4ZM7.5 2.75C7.5 2.6143 7.6143 2.5 7.75 2.5H10.25C10.3857 2.5 10.5 2.6143 10.5 2.75V4H7.5V2.75Z" fill="currentColor"></path>
            </svg>
          </button>
        </NodeToolbar>
      )}
      {!isActive && (<div className="absolute top-2 right-2 z-10 rounded bg-[#2D2D2E] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white/65 border text-sm border-[#5b5b5b]">
              Off
            </div>)}
            
      {children}
      {name && (
        <NodeToolbar
          position={Position.Bottom}
          isVisible
          className="max-w-[200px] text-center"
        >
          <p className="font-medium">
            {name}
          </p>
          {description && (
            <p className="text-muted-foreground truncate text-sm">
              {description}
            </p>
          )}
        </NodeToolbar>
      )}
    </>
  );
};
"use client";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RefreshCcw, Share2, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { useControls } from "react-zoom-pan-pinch";

export const ResumeToolbar = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <ButtonGroup className="[--radius:1.05rem]">
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => zoomIn(0.1)}>
            <ZoomInIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Zoom In</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => zoomOut(0.1)}>
            <ZoomOutIcon className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Zoom Out</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={() => resetTransform()}>
            <RefreshCcw className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Reset View</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={250}>
        <TooltipTrigger asChild>
          <Button variant="outline">
            <Share2 className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share</p>
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
};

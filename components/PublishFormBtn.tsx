import React from "react";
import { Button } from "./ui/button";
import { MdPublish } from "react-icons/md";

export default function PublishFormBtn() {
  return (
    <Button variant={"outline"} className="gap-2">
      <MdPublish className="h-4 w-4" />
      Publish
    </Button>
  );
}

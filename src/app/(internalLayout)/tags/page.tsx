import { Fragment } from "react";
import { HeadingWrapper } from "@/app/components/tags/HeadingWrapper";
import { ListTags } from "@/app/components/tags/ListTags";
import { Dialog } from "@/app/components/Dialog";
import { AddTagForm } from "@/app/components/tags/AddTagForm";

export default async function Tags() {
  return (
    <Fragment>
      <HeadingWrapper />
      <div className="mt-10">
        <ListTags />
        <Dialog title="Create a new tag">
          <AddTagForm />
        </Dialog>
      </div>
    </Fragment>
  );
}

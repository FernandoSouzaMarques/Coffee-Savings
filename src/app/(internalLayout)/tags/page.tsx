import { Fragment } from "react";
import { HeadingWrapper } from "@/app/components/tags/HeadingWrapper";
import { ListTags } from "@/app/components/tags/ListTags";
import { AddTagModal } from "@/app/components/tags/AddTagModal";

export default async function Tags() {
  return (
    <Fragment>
      <HeadingWrapper />
      <div className="mt-10">
        <ListTags />
        <AddTagModal />
      </div>
    </Fragment>
  );
}

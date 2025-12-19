import { FileUpload } from "./FileUpload";
import { ModalRoot } from "./ModalRoot";
import { NewFolder } from "./NewFolder";
import { Preview } from "./Preview";
import { RenameFile } from "./RenameFile";
import { RenameFolder } from "./RenameFolder";

export function Modals() {
  return (
    <>
      <ModalRoot name="NewFolder">
        <NewFolder />
      </ModalRoot>
      <ModalRoot name="RenameFolder">
        <RenameFolder />
      </ModalRoot>
      <ModalRoot name="RenameFile">
        <RenameFile />
      </ModalRoot>
      <ModalRoot name="NewFile">
        <FileUpload />
      </ModalRoot>
      <ModalRoot name="Preview">
        <Preview />
      </ModalRoot>
    </>
  );
}

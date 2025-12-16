// import { FileUpload } from "./FileUpload";
import { ModalRoot } from "./ModalRoot";
import { NewFolder } from "./NewFolder";

export function Modals() {
  return (
    <>
      <ModalRoot name="NewFolder">
        <NewFolder />
      </ModalRoot>
      {/* <ModalRoot name="NewFile">
        <FileUpload />
      </ModalRoot> */}
    </>
  );
}

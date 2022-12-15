import { ConnectWallet, useStorageUpload, useContract, useContractWrite, useContractRead, Web3Button} from "@thirdweb-dev/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./styles/Home.css";

export default function Home() {
    const { contract } = useContract("0x58DD2f5b74662A781177E1daa0c9A2eF10a38a8B");
    const { mutateAsync: addnewipfsrecord } = useContractWrite(contract, "addnewipfsrecord");
    const { mutateAsync: upload } = useStorageUpload();
    const onDrop = useCallback(
      async (acceptedFiles: File[]) => {
        const uris = await upload({ data: acceptedFiles });
        console.log(uris);
        const tx = await addnewipfsrecord(["0",uris]);
      },
      [upload],
    );
    const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
    return (
      <div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <button>Upload medical record to IPFS</button>
        </div>
      </div>
    );
}

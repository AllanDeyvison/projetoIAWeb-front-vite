import UploadPDF from "@/components/uploadPDF/UploadPDF";
import { NewAdminUser } from "./NewAdminUser";

export const Admin = () => {



    return (
        <div className="mt-10 grid grid-cols-1 place-items-center">
            <UploadPDF/>
            <div className="mt-10 grid grid-cols-1 place-items-center">
            <NewAdminUser/> 
        </div>
        </div>
    )
}
import { FC, useState, useContext, useEffect } from "react";
import FileInput from "../../components/input/FileInput";
import useInputChangeHandler from "../../hooks/useInputChangeHandler";
import { AuthContext } from "../../stores/user";
import { useNavigate } from "react-router-dom";

interface ISetupProfileTextInput {
  firstName: string;
  lastName: string;
  course: string;
  position: string;
}

const SetupProfile: FC<any> = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, onInputChangeHandler } =
    useInputChangeHandler<ISetupProfileTextInput>();
  const [uploadedFiles, setUploadedFiles] = useState<any>([]);

  useEffect(() => {
    if (authContext.user !== null) {
      navigate("/");
    }
  }, []);

  const onSetupProfile = async () => {
    authContext.setupProfile({
      ...data,
      email: authContext.user?.email,
      profileImage: {
        publicId: uploadedFiles[0].publicId,
        url: uploadedFiles[0].url,
      },
    });
  };

  return (
    <div>
      <input
        onChange={onInputChangeHandler}
        type="text"
        name="firstName"
        placeholder="First Name"
        value={data?.firstName ? data.firstName : ""}
      />
      <input
        onChange={onInputChangeHandler}
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={data?.lastName ? data.lastName : ""}
      />
      <input
        onChange={onInputChangeHandler}
        type="text"
        name="course"
        placeholder="Course"
        value={data?.course ? data.course : ""}
      />
      <input
        onChange={onInputChangeHandler}
        type="text"
        name="position"
        placeholder="Position"
        value={data?.position ? data.position : ""}
      />
      <FileInput
        uploadedFiles={uploadedFiles}
        setUploadedFiles={(data: any) =>
          setUploadedFiles((prevFiles: any) => [...prevFiles, data])
        }
      />
      <button onClick={() => onSetupProfile()}>Save</button>
    </div>
  );
};

export default SetupProfile;

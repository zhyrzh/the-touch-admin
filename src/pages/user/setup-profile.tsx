import { FC, useState, useContext, useEffect, useRef } from "react";
import FileInput from "../../components/input/FileInput";
import useInputChangeHandler from "../../hooks/useInputChangeHandler";
import { AuthContext } from "../../stores/user";
import { useNavigate } from "react-router-dom";
import LogoLg from "../../assets/the-touch-logo-lg.png";
import TextInput from "../../components/input/TextInput";
import { useInputValidator } from "../../hooks/useInputValidator";
import { IUploadedImage } from "../../hooks/useUploadImage";
import { MessageContext } from "../../stores/message";
import DropdownInput from "../../components/input/DropdownInput";
import { courseOptions, posOptions } from "../../constants";

interface ISetupProfileTextInput {
  firstName: string;
  lastName: string;
  course: string;
  position: string;
}

const SetupProfile: FC<any> = () => {
  const authContext = useContext(AuthContext);
  const messageContext = useContext(MessageContext);
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<{
    publicId: string;
    url: string;
  }>();

  const { data, onInputChangeHandler, onDropdownInputChangeHandler } =
    useInputChangeHandler<ISetupProfileTextInput>();

  const { errors, removeErrors, validateInputs } =
    useInputValidator<ISetupProfileTextInput>({
      course: data?.course ? data.course : "",
      firstName: data?.firstName ? data.firstName : "",
      lastName: data?.lastName ? data.lastName : "",
      position: data?.position ? data.position : "",
    });

  const [uploadedFiles, setUploadedFiles] = useState<any>([]);
  const fileUploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authContext.user !== null) {
      navigate("/");
    }
  }, [authContext.user]);

  const onSetupProfile = async () => {
    const errorCount = validateInputs();
    if (profileImage?.publicId && errorCount === 0) {
      authContext.setupProfile({
        ...data,
        email: authContext.user?.email,
        profileImage,
      });
    } else {
      if (!profileImage?.publicId) {
        messageContext.onAddMessage(
          "Please add a profile image before submitting"
        );
      }
      return;
    }
  };

  const onAddAsset = (image: IUploadedImage) => {
    setProfileImage((_prevImage) => ({
      ...image,
    }));
  };

  return (
    <div className="auth" style={{ marginTop: "90px" }}>
      <div className="auth__card-container">
        <h1 className="auth__title">Setup your profile</h1>
        <h3 className="auth__sub-title">
          Fill up details to setup your profile
        </h3>
        <div
          className="auth__user-profile-image-container"
          onClick={() => {
            if (fileUploadRef.current) {
              fileUploadRef.current.click();
            }
          }}
          style={{
            backgroundColor:
              uploadedFiles.length >= 1 ? "transparent" : "#d9d9d9",
          }}
        >
          {profileImage ? (
            <div
              style={{
                borderRadius: "100%",
              }}
            >
              <img
                className="auth__user-profile-image"
                src={profileImage.url}
                alt=""
                draggable={false}
              />
            </div>
          ) : null}
        </div>
        <FileInput
          uploadedFiles={uploadedFiles}
          setUploadedFiles={(data: any) =>
            setUploadedFiles((_prevFiles: any) => [data])
          }
          ref={fileUploadRef}
          onAddAsset={onAddAsset}
          isHidden
        />
        <TextInput
          name="firstName"
          placeholder="First Name"
          value={data?.firstName!}
          type="text"
          errors={errors}
          onInputChangeHandler={onInputChangeHandler}
          removeErrors={(name: string) => {
            removeErrors(name);
          }}
        />
        <TextInput
          name="lastName"
          placeholder="Last Name"
          value={data?.lastName!}
          errors={errors}
          onInputChangeHandler={onInputChangeHandler}
          removeErrors={(name: string) => {
            removeErrors(name);
          }}
        />
        <DropdownInput
          isSearchable={true}
          isMulti={false}
          placeHolder="Course"
          options={courseOptions}
          onChange={onDropdownInputChangeHandler}
          errors={errors}
          name="course"
          removeErrors={(name: string) => {
            removeErrors(name);
          }}
        />
        <DropdownInput
          isSearchable={true}
          isMulti={false}
          placeHolder="Position"
          options={posOptions}
          onChange={onDropdownInputChangeHandler}
          errors={errors}
          name="position"
          removeErrors={(name: string) => {
            removeErrors(name);
          }}
        />
        <div className={`auth__button-container `}>
          <button className="auth__button" onClick={() => onSetupProfile()}>
            Save
          </button>
        </div>
      </div>
      <img className="auth__page-image" src={LogoLg} alt="" draggable={false} />
    </div>
  );
};

export default SetupProfile;

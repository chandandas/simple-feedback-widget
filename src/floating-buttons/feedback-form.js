import { useEffect, useState } from "react";
import { useScreenshot } from "use-react-screenshot";
import axios from "axios";
import { JSEncrypt } from "jsencrypt";


const encrypt = new JSEncrypt();

const publicKey = `
    -----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
  FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
  xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
  gwQco1KRMDSmXSMkDwIDAQAB
  -----END PUBLIC KEY-----`;

function FileItem({ file, removeFile }) {
  if (file === undefined) return;

  return (
    <li className="list-group-item px-0 py-1">
      <p
        className="text-truncate m-0"
        data-toggle="tooltip"
        data-placement="top"
        title={file.name}
      >
        <a
          href="#"
          className="text-danger"
          onClick={(event) => removeFile(event, file)}
        >
          X
        </a>{" "}
        {file.name}
      </p>
    </li>
  );
}

function ShowMessage({ status }) {
  if (parseInt(status.code) === 200) {
    return <small className="text-center text-success">{status.message}</small>;
  } else if (status.code === 500) {
    return <small className="text-center text-danger">{status.message}</small>;
  }

  return null;
}
export default function FeedbackForm(props) {
  const { isOpen , logo, imagePlaceHolder, apiUrl, apiKey} = props;

  const [data, setData] = useState({
    summary: "",
    type: "",
    description: "",
  });
  const [status, setStatus] = useState({});

  const [image, takeScreenshot] = useScreenshot();
  const [screenShotAdded, setScreenShotAdded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [types, setTypes] = useState([{ id: 0, name: "Select a type" }]);

  useEffect(() => {
    setScreenShotAdded(false);
    setStatus({
      code: 0,
      message: "",
    });
    getTypes();
  }, []);

  function summaryOnChange(event) {
    const input = event.target.value;
    const oldData = { ...data };
    oldData.summary = input;

    setData(oldData);
  }
  function descriptionOnChange(event) {
    const input = event.target.value;
    const oldData = { ...data };
    oldData.description = input;

    setData(oldData);
  }
  function typeOnChange(event) {
    const input = event.target.value;
    const oldData = { ...data };
    oldData.type = input;

    setData(oldData);
  }
  function clearForm() {
    const oldData = { ...data };
    oldData.summary = "";
    oldData.type = "";
    oldData.description = "";

    setData(oldData);
    setScreenShotAdded(false);
    setUploadedFiles([]);
  }

  function getTypes() {
    const API_URL = {apiUrl};
    try {
      axios
        .get(API_URL, {
          headers: {
            "Content-Type": "application/json",
            token: getKey(),
          },
        })
        .then((response) => {
          setTypes(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  function getKey() {
    encrypt.setPublicKey(publicKey);
    const encrypted = encrypt.encrypt(apiKey)
     
    return encrypted;
  }
  function onSubmit() {
    const API_URL = {apiUrl};
    try {
      const formData = new FormData();

      uploadedFiles.map((file, index) => {
        formData.append(index, file);
      });

      if (screenShotAdded) {
        formData.append("screenShot", image);
        formData.append("screenShotAdded", 1);
      } else {
        formData.append("screenShot", null);
        formData.append("screenShotAdded", 0);
      }

      formData.append("description", data.description);
      formData.append("summary", data.summary);
      formData.append("type", data.type);
      formData.append("userId", "admin");

      axios
        .post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: getKey(),
          },
        })
        .then((response) => {
          setStatus({
            code: response.data.status,
            message: response.data.message,
          });
          if (response.data.status === 200) {
            clearForm();
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  function captureScreenShot() {
    const homeRef = document.getElementsByClassName("app")[0];
    const popUpRef = document.getElementsByClassName("modal-dialog")[0];

    setScreenShotAdded(true);

    if (popUpRef !== undefined) {
      return takeScreenshot(popUpRef);
    } else {
      return takeScreenshot(homeRef);
    }
  }
  function attachFile() {
    const { files } = event.target;
    const file = files?.[0];
    let newFiles = [...uploadedFiles];
    if (file !== undefined) {
      newFiles.push(file);
      setUploadedFiles(newFiles);
    }
  }
  function removeFile(event, file) {
    event.stopPropagation();

    const newFiles = uploadedFiles.filter((ef) => ef.name !== file.name);
    setUploadedFiles(newFiles);
  }

  function removeScreenShot() {
    setScreenShotAdded(false);
  }

  let initStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    position: "absolute",
    width: "700px",
    left: -700,
    top: -400,
    zIndex: 1,
    boxShadow: "0 0 0 1px rgba(0, 0, 0, .08), 0 2px 2px rgba(0, 0, 0, .15)",
    outline: "none",
    transition: `all ${2 * 50 + 200}ms cubic-bezier(0.71, 0.71, 0, 1.18) 0ms`,
  };

  if (!isOpen) return null;

  return (
    <div style={initStyle}>
      <div className="card rounded-0 w-100">
        <div className="card-header p-0">
          <div className="row m-0 d-flex justify-content-center align-items-center bg-secondary">
            <div className="col-4 bg-secondary py-2">
              <img src={logo} className="img-fluid" />
            </div>
            <div className="col-8 bg-warning">
              <h3 className="text-uppercase text-white title-mt text-center">
                Beta Testing Feedback
              </h3>
            </div>
          </div>
        </div>
        <ShowMessage status={status} />
       
        <div className="card-body px-3 py-2">
          <div className="row">
            <div className="col-6 border-right">
              <div className="form-group">
                <label htmlFor="summary">
                  Summary<span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="summary"
                  aria-describedby="summary"
                  value={data.summary}
                  onChange={summaryOnChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Type">
                  Type<span className="text-danger">*</span>
                </label>
                <select
                  className="form-control"
                  onChange={typeOnChange}
                  value={data.type}
                >
                  <option value="0"> -- Select a type -- </option>
                  {types.map((type, index) => (
                    <option key={index} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-0">
                <label htmlFor="description">
                  Description<span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control form-control-sm"
                  id="description"
                  rows="3"
                  value={data.description}
                  onChange={descriptionOnChange}
                ></textarea>
              </div>
            </div>

           
            <div className="col-6">
              <div className="media pb-2 mb-2 border-bottom">
                {screenShotAdded ? (
                  <img src={image} className="img-fluid mr-3 w-25" alt="..." />
                ) : (
                  <img
                    src={imagePlaceHolder}
                    className="img-fluid mr-3 w-25"
                    alt="..."
                  />
                )}
                <div className="media-body">
                  <h6 className="small text-secondary">Screenshot</h6>
                  <div className="input-group input-group-sm mb-3">
                    <div className="custom-file">
                      <button
                        className="btn btn-primary btn-sm align-items-center "
                        onClick={captureScreenShot}
                      >
                        Take a Screenshot
                      </button>
                      <button
                        className="btn btn-danger btn-sm align-items-center ml-2"
                        onClick={removeScreenShot}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="small text-secondary mb-2">Attach files</h6>
              <div className="input-group input-group-sm">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile"
                    aria-describedby="inputGroupFileAddon"
                    onChange={attachFile}
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    Choose
                  </label>
                </div>
              </div>
              <ul className="list-group list-group-flush scrolldiv">
                {uploadedFiles.map((file) => (
                  <FileItem
                    key={file.name}
                    file={file}
                    removeFile={removeFile}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center px-3 py-2">
          <div>
            <small className="text-muted">Powered by Trigent</small>
          </div>
          <div>
            <button className="btn btn-primary btn-sm" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

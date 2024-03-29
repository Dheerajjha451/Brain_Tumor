"use client";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import axios from "axios";

const descriptions = {
  Glioma: "Glioma is a growth of cells that starts in the brain or spinal cord.\nThe cells in a glioma look similar to healthy brain cells called glial cells.\nGlial cells surround nerve cells and help them function.\nAs a glioma grows it forms a mass of cells called a tumor.\nThe tumor can grow to press on brain or spinal cord tissue and cause symptoms.\nSymptoms depend on which part of the brain or spinal cord is affected.\nCommon signs and symptoms of gliomas include:\n\nHeadache, particularly one that hurts the most in the morning.\nNausea and vomiting.\nConfusion or a decline in brain function, such as problems with thinking and understanding information.\nMemory loss.\nPersonality changes or irritability.\nVision problems, such as blurred vision, double vision or loss of peripheral vision.\nSpeech difficulties.",
  Meningioma: "A meningioma is a tumor that grows from the membranes that surround the brain and spinal cord, called the meninges.\nA meningioma is not a brain tumor, but it may press on the nearby brain, nerves and vessels.\nMeningioma is the most common type of tumor that forms in the head.\nMost meningiomas grow very slowly.\nThey can grow over many years without causing symptoms.\nBut sometimes, their effects on nearby brain tissue, nerves or vessels may cause serious disability.\nMeningiomas occur more often in women. They're often found at older ages.\nBut they can happen at any age.\nBecause most meningiomas grow slowly, often without symptoms, they do not always need treatment right away.\nInstead, they may be watched over time.\nSymptoms may include:\n\nChanges in vision, such as seeing double or blurring.\nHeadaches that are worse in the morning.\nHearing loss or ringing in the ears.\nMemory loss.\nLoss of smell.\nSeizures.\nWeakness in the arms or legs.\nTrouble speaking.",
  Pituitary: "Pituitary tumors are unusual growths that develop in the pituitary gland.\nThis gland is an organ about the size of a pea.\nIt's located behind the nose at the base of the brain.\nSome of these tumors cause the pituitary gland to make too much of certain hormones that control important body functions.\nOthers can cause the pituitary gland to make too little of those hormones.\nMost pituitary tumors are benign.\nThat means they are not cancer.\nAnother name for these noncancerous tumors is pituitary adenomas.\nMost adenomas stay in the pituitary gland or in the tissue around it, and they grow slowly.\nThey typically don't spread to other parts of the body.\nPituitary tumors can be treated in several ways.\nThe tumor may be removed with surgery.\nOr its growth may be controlled with medications or radiation therapy.\nSometimes, hormone levels are managed with medicine.\nYour health care provider may suggest a combination of these treatments.\nIn some cases, observation — also called a ''wait-and-see'' approach — may be the right choice.\nMacroadenomas can put pressure on the pituitary gland, on nerves, on the brain and on other parts of the body nearby.\nThat can cause symptoms such as:\n\nHeadache.\nEye problems due to pressure on the optic nerve, especially loss of side vision, also called peripheral vision, and double vision.\nPain in the face, sometimes including sinus pain or ear pain.\nDrooping eyelid.\nSeizures.\nNausea and vomiting."
};

export default function UserInfoWithImageUpload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [description, setDescription] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData);

      const data = response.data;
      setPrediction(data.prediction);

      const matchingDescription = descriptions[data.prediction];
      if (matchingDescription) {
        setDescription(matchingDescription);
      } else {
        setDescription("Description not found");
      }

    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  const handleNewReport = () => {
    window.location.reload();
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="relative">
        <div className="shadow-lg p-8 flex flex-col gap-4 my-6 h-[calc(100vh/1.5)] w-[calc(100vh/1.5)]" style={{ borderRadius: '20px', background: '#7AA2E3', border: '2px solid #fff' }}>
          {imageUrl ? (
            <div className="border border-gray-300 rounded-md p-4 w-full h-full">
              <img src={imageUrl} alt="Uploaded" className="max-h-full max-w-full object-contain" style={{ borderRadius: '20px' }} />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 h-full">
              <label htmlFor="fileUpload" className="cursor-pointer flex items-center justify-center gap-2">
                <FiUpload className="text-white" size={32} />
                <span className="text-white text-3xl">Upload Image</span>
                <input type="file" id="fileUpload" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
          )}
        </div>
      </div>
      {imageUrl && (
        <div className="flex gap-4 mt-4">
          <button onClick={handleUpload} className="bg-blue-600 text-white px-6 py-2 rounded-md">Check</button>
          <button onClick={handleNewReport} className="bg-gray-600 text-white px-6 py-2 rounded-md">Upload New </button>
        </div>
      )}
      {prediction && (
        <div>
          <h3 className="font-bold text-4xl text-slate-950 mx-4 my-2">Prediction:</h3>
          <p className="text-customBlue mx-4 text-center text-indigo-900">{prediction}</p>
        </div>
      )}
      {description && (
        <div>
          <h3 className="font-bold text-3xl mx-8 text-slate-950">Description:</h3>
          <p className="mx-8 text-indigo-900">{description}</p>
        </div>
      )}
      
    </div>
    
  );
}


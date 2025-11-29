import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router";

// Import Components
import ImageModal from "../modal/ImageModal";
import Step1Topics from "./Step1Topics";
import Step2Details from "./Step2Details";
import Step3Styling from "./Step3Styling";
import CommunityFormNavigation from "./CommunityFormNavigation";
import Spinner from "../../util/loading screen/Spinner";

const CreateCommunity = forwardRef((props, ref) => {
  let topics = useLoaderData();

  // --- STATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);
  const [communityName, setCommunityName] = useState("communityName");
  const [communityDesc, setCommunityDesc] = useState("Community Description");

  // Image States
  const [banner, setBanner] = useState();
  const [logo, setLogo] = useState();
  const [bannerPreview, setBannerPreview] = useState();
  const [logoPreview, setLogoPreview] = useState();
  const [finalBannerUrl, setFinalBannerUrl] = useState();
  const [finalLogoUrl, setFinalLogoUrl] = useState();
  const [finalBanner, setFinalBanner] = useState();
  const [finalLogo, setFinalLogo] = useState();

  // --- REFS ---
  const dialogRef = useRef();
  const bannerRef = useRef();
  const logoRef = useRef();
  const bannerModalRef = useRef();
  const logoModalRef = useRef();

  const submit = useSubmit();
  const navigate = useNavigate();
  const fetcher = useFetcher();

  // derived loading state from fetcher
  const isSubmitting =
    fetcher.state === "submitting" || fetcher.state === "loading";

  // --- IMPERATIVE HANDLE ---
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsModalOpen(true);
      dialogRef.current?.showModal();
    },
    close: () => {
      setIsModalOpen(false);
      dialogRef.current?.close();
    },
  }));

  // --- SCROLL LOCK ---
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  useEffect(() => {
    // Check if the action is done (idle) and we have data
    if (fetcher.state === "idle" && fetcher.data) {
      // If the action returned our success signal
      if (fetcher.data.ok) {
        // 1. Close Modal
        dialogRef.current.close();
        setIsModalOpen(false);
        setFinalBanner(undefined);
        setFinalLogo(undefined);
        setBanner(undefined);
        setLogo(undefined);
        setSelectedTags([]);
        setCommunityDesc("Community Description");
        setCommunityName("r/communityName");
        setStep(1);

        // 2. Redirect manually
        navigate(`/r/${fetcher.data.communityName}`);
      }

      // Handle errors if you want
      if (fetcher.data.error) {
        console.error(fetcher.data.error);
        // Show an error toast/message here
      }
    }
  }, [fetcher.state, fetcher.data, navigate]);

  // --- RESET FORM ON CLOSE ---
  useEffect(() => {
    if (step < 1) {
      dialogRef.current.close();
      setStep(1);
      setIsModalOpen(false);
    }
  }, [step]);

  // --- PREVIEW URL MANAGEMENT ---
  useEffect(() => {
    let bannerUrl, logoUrl;
    if (banner) {
      bannerUrl = URL.createObjectURL(banner);
      setBannerPreview(bannerUrl);
    } else setBannerPreview(undefined);

    if (logo) {
      logoUrl = URL.createObjectURL(logo);
      setLogoPreview(logoUrl);
    } else setLogoPreview(undefined);

    return () => {
      if (bannerUrl) URL.revokeObjectURL(bannerUrl);
      if (logoUrl) URL.revokeObjectURL(logoUrl);
    };
  }, [banner, logo]);

  // --- HANDLERS ---
  function selectTags(tag) {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((n) => n !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([tag, ...selectedTags]);
    }
  }

  function removeTags(tag) {
    setSelectedTags(selectedTags.filter((item) => item !== tag));
  }

  function handleBanner(e) {
    if (e.target.files[0]) {
      setBanner(e.target.files[0]);
      bannerModalRef.current.open();
    }
  }

  function handleLogo(e) {
    if (e.target.files[0]) {
      setLogo(e.target.files[0]);
      logoModalRef.current.open();
    }
  }

  function changeCommunityName(e) {
    const raw = e.target.value.replace(/^r\//, "").trim();
    setCommunityName(raw);
  }

  function handleBannerImage() {
    setBanner(undefined);
    setBannerPreview(undefined);
    setFinalBannerUrl(undefined);
    if (bannerRef.current) bannerRef.current.value = null;
  }

  function handleLogoImage() {
    setLogo(undefined);
    setLogoPreview(undefined);
    setFinalLogoUrl(undefined);
    if (logoRef.current) logoRef.current.value = null;
  }

  function handleSubmit() {
    const formData = new FormData();
    formData.append("name", communityName);
    formData.append("description", communityDesc);
    formData.append("logo", finalLogo);
    formData.append("Banner", finalBanner);
    formData.append("tagList", JSON.stringify(selectedTags));

    fetcher.submit(formData, {
      method: "POST",
      encType: "multipart/form-data",
    });
  }

  return (
    <>
      <dialog
        ref={dialogRef}
        className="
          fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-full h-full md:h-auto md:w-[90%] max-w-5xl md:max-h-[90vh]
          bg-[#1a1a1b] text-white
          backdrop:bg-black/70 shadow-2xl 
          rounded-none md:rounded-xl 
          p-0 overflow-hidden
          hidden open:flex flex-col
        "
      >
        {/* HEADER */}
        <div className="px-6 pt-6 pb-2 shrink-0 flex justify-between items-end border-b border-gray-800">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Step {step} of 3
            </p>
            <h2 className="text-xl font-semibold text-gray-200">
              {step === 1 && "Select Topics"}
              {step === 2 && "Community Details"}
              {step === 3 && "Style & Preview"}
            </h2>
          </div>
          <button
            onClick={() => {
              // prevent closing while submitting
              if (isSubmitting) return;
              setIsModalOpen(false);
              dialogRef.current?.close();
            }}
            className={`text-gray-500 hover:text-white pb-1 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-disabled={isSubmitting}
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {step === 1 && (
            <Step1Topics
              topics={topics}
              selectedTags={selectedTags}
              selectTags={selectTags}
              removeTags={removeTags}
            />
          )}

          {step === 2 && (
            <Step2Details
              communityName={communityName}
              communityDesc={communityDesc}
              changeCommunityName={changeCommunityName}
              setCommunityDesc={setCommunityDesc}
            />
          )}

          {step === 3 && (
            <Step3Styling
              logo={logo}
              banner={banner}
              bannerRef={bannerRef}
              logoRef={logoRef}
              finalBannerUrl={finalBannerUrl}
              finalLogoUrl={finalLogoUrl}
              communityName={communityName}
              communityDesc={communityDesc}
              handleBanner={handleBanner}
              handleLogo={handleLogo}
              handleBannerImage={handleBannerImage}
              handleLogoImage={handleLogoImage}
            />
          )}
        </div>

        {/* FOOTER */}
        <CommunityFormNavigation
          step={step}
          setStep={setStep}
          handleSubmit={handleSubmit}
          // pass down submitting state in case the nav wants to disable buttons
          isSubmitting={isSubmitting}
        />

        {isSubmitting && (
          <Spinner />
        )}
      </dialog>

      {/* Loading overlay/page - shows while fetcher is submitting/loading */}

      {/* HELPER MODALS */}
      <ImageModal
        ref={bannerModalRef}
        imagePreview={bannerPreview}
        aspect={5 / 1}
        onCropDone={(croppedUrl) => setFinalBannerUrl(croppedUrl)}
        onFileSet={(blob) => setFinalBanner(blob)}
        name="Banner"
        value={finalBanner}
      />

      <ImageModal
        ref={logoModalRef}
        imagePreview={logoPreview}
        aspect={1 / 1}
        onCropDone={(croppedUrl) => setFinalLogoUrl(croppedUrl)}
        onFileSet={(blob) => setFinalLogo(blob)}
      />
    </>
  );
});

export default CreateCommunity;

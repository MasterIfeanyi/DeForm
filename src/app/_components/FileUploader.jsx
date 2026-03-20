import { useRef, useState, useCallback } from "react";
import { FiUploadCloud, FiFile, FiX, FiCheck } from "react-icons/fi";

export function FileUploader({ field, t, onUpload }) {
    const inputRef = useRef(null);
    const [uploadState, setUploadState] = useState("idle");
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const maxSizeLabel = field.maxSize || "10MB";
    const maxBytes = parseMaxSize(maxSizeLabel);

    const handleFile = useCallback(
        async (file) => {
            setErrorMsg("");

            if (maxBytes && file.size > maxBytes) {
                setUploadState("error");
                setErrorMsg(`File exceeds ${maxSizeLabel} limit`);
                return;
            }

            setSelectedFile(file);
            setUploadState("uploading");

            try {
                if (onUpload) {
                    await onUpload(file);
                } else {
                    await new Promise((res) => setTimeout(res, 1200));
                }
                setUploadState("success");
            } catch {
                setUploadState("error");
                setErrorMsg("Upload failed. Please try again.");
            }
        },
        [maxBytes, maxSizeLabel, onUpload]
    );

    const onInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
        e.target.value = "";
    };

    const onDrop = (e) => {
        e.preventDefault();
        setUploadState("idle");
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setUploadState("dragging");
    };

    const onDragLeave = () => setUploadState("idle");

    const reset = () => {
        setSelectedFile(null);
        setUploadState("idle");
        setErrorMsg("");
    };

    const isDragging = uploadState === "dragging";
    const isUploading = uploadState === "uploading";
    const isSuccess = uploadState === "success";
    const isError = uploadState === "error";

    return (
        <div
            className={`
        border-2 border-dashed rounded-lg p-10 text-center transition-colors
        ${isDragging ? "border-blue-500 bg-blue-50" : ""}
        ${isSuccess ? "border-green-500 bg-green-50" : ""}
        ${isError ? "border-red-400 bg-red-50" : ""}
        ${!isDragging && !isSuccess && !isError ? "border-neutral-700 hover:border-neutral-500" : ""}
        ${!isUploading ? "cursor-pointer" : "cursor-not-allowed opacity-70"}
      `}
            onClick={() => !isUploading && inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept={field.accept}
                onChange={onInputChange}
            />

            {(uploadState === "idle" || uploadState === "dragging") && (
                <>
                    <FiUploadCloud
                        className={`mx-auto mb-2 text-3xl transition-colors ${isDragging ? "text-blue-500" : "text-neutral-400"
                            }`}
                    />
                    <div className="text-black mb-1">
                        {isDragging
                            ? t("builder.canvas.dropHere", "Drop file here")
                            : t("builder.canvas.clickToUpload", "Click or drag to upload")}
                    </div>
                    <div className="text-neutral-500 text-sm">
                        {t("builder.canvas.maxSize", "Max {{size}}", { size: maxSizeLabel })}
                    </div>
                </>
            )}

            {isUploading && (
                <>
                    <div className="flex justify-center mb-2">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                    <div className="text-black mb-1">
                        {t("builder.canvas.uploading", "Uploading...")}
                    </div>
                    <div className="text-neutral-500 text-sm truncate max-w-xs mx-auto">
                        {selectedFile?.name}
                    </div>
                </>
            )}

            {isSuccess && (
                <div onClick={(e) => e.stopPropagation()}>
                    <FiCheck className="mx-auto mb-2 text-3xl text-green-500" />
                    <div className="text-black mb-1 flex items-center justify-center gap-2">
                        <FiFile className="text-neutral-500" />
                        <span className="truncate max-w-45">{selectedFile?.name}</span>
                        <button
                            onClick={reset}
                            className="ml-1 text-neutral-400 hover:text-neutral-600 transition-colors"
                            title="Remove file"
                        >
                            <FiX />
                        </button>
                    </div>
                    <div className="text-green-600 text-sm">
                        {t("builder.canvas.uploadSuccess", "Uploaded successfully")}
                    </div>
                </div>
            )}

            {isError && (
                <>
                    <FiUploadCloud className="mx-auto mb-2 text-3xl text-red-400" />
                    <div className="text-red-600 mb-1">{errorMsg}</div>
                    <div className="text-neutral-500 text-sm">
                        {t("builder.canvas.tryAgain", "Click to try again")}
                    </div>
                </>
            )}
        </div>
    );
}

function parseMaxSize(size) {
    const match = size.match(/^(\d+(?:\.\d+)?)\s*(KB|MB|GB)?$/i);
    if (!match) return null;
    const num = parseFloat(match[1]);
    const unit = (match[2] || "B").toUpperCase();
    const multipliers = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3 };
    return num * (multipliers[unit] ?? 1);
}
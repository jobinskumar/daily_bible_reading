import { useEffect, useState } from "react";
import { formatDateString } from "../utils/utils";

export default function AppDailyNote({
  dateString,
  dailyStatusData,
  onDailyStatusUpdate,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [note, setNote] = useState(dailyStatusData?.notes || "");
  const [textAreaCharLen, setTextAreaCharLen] = useState(0);
  const maxCharLimit = 500;

  useEffect(() => {
    setNote(dailyStatusData?.notes || "");
    setTextAreaCharLen(dailyStatusData?.notes?.length || 0);
    setIsEditMode(false);
  }, [dailyStatusData]);

  function handleEditMode() {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      const newState = {
        ...dailyStatusData,
        notes: note.trim(),
      };
      onDailyStatusUpdate(dateString.split("T")[0], newState);
    }
  }

  function textAreaOnChange(event) {
    setNote(event.target.value);
    setTextAreaCharLen(event.target.value.length);
  }

  function cancelEdit() {
    setIsEditMode(false);
    setNote(dailyStatusData?.notes || "");
  }

  return (
    <>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-bold text-gray-700 mb-0">
            Notes
          </label>
          {isEditMode ? (
            <div className="flex gap-2">
              <button
                className="text-blue-600 font-bold hover:text-blue-800 flex items-center gap-1 mr-2 underline disabled:text-gray-400 disabled:cursor-not-allowed"
                onClick={handleEditMode}
                disabled={textAreaCharLen > maxCharLimit}
              >
                Save
              </button>
              <button
                className="hover:text-blue-800 flex items-center gap-1 mr-2 underline"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400 p-1 text-right">
              {formatDateString(dateString)}
            </p>
          )}
        </div>
        {isEditMode ? (
          <>
            <textarea
              value={note || ""}
              onChange={textAreaOnChange}
              rows="5"
              placeholder="Add notes about today's reading..."
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none outline-none transition-all resize-none"
            ></textarea>
            {textAreaCharLen > maxCharLimit ? (
              <p className="text-red-700 text-xs">
                Exceeded {maxCharLimit} characters.
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                {maxCharLimit - textAreaCharLen} characters remaining.
              </p>
            )}
          </>
        ) : (
          <div
            className="p-3 bg-gray-50 border border-gray-200 rounded cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleEditMode}
          >
            <pre className="whitespace-pre-line text-sm text-gray-500 italic">
              {dailyStatusData?.notes || "No notes added."}
            </pre>
          </div>
        )}
      </div>
    </>
  );
}

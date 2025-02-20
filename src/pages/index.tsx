import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { SurveyBaseSchema, type Survey } from "~/types";
import debounce from "lodash.debounce";
import { api } from "~/utils/api";
import IdInput from "~/components/IdInput";
import { ToastContainer, toast } from "react-toastify";
import TextArea from "~/components/TextArea";
import { BackspaceIcon } from "@heroicons/react/16/solid";
import DangerDialog from "~/components/DangerDialog";
export default function Home() {
  const CACHE_KEY = "edit-survey-unsaved";
  const [postId, setPostId] = useState("");
  const [error, setError] = useState(false);
  const [surveyData, setSurveyData] = useState({
    id: "",
    notes: "",
    created_at: "",
  });
  const setNotes = (notes: string) => {
    setSurveyData((prev) => ({ ...prev, notes }));
  };
  const [notesStateCache, setNotesStateCache] = useState("");
  const [dangerOpen, setDangerOpen] = useState(false);

  const successToast = (message: string) =>
    toast(message, {
      type: "success",
      position: "bottom-right",
    });
  const errorToast = (message: string) =>
    toast(message, {
      type: "error",
      position: "bottom-right",
    });
  useEffect(() => {
    try {
      const data = localStorage.getItem(CACHE_KEY);
      if (!data) return;
      const json: unknown = JSON.parse(data);
      const parsed = SurveyBaseSchema.parse(json);
      setSurveyData(parsed);
      setNotesStateCache(parsed.notes);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const saveSurveyToLocal = useCallback((survey: Survey) => {
    const json = JSON.stringify(survey);
    localStorage.setItem(CACHE_KEY, json);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const debouncedSaveSurveyToLocal = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    debounce(saveSurveyToLocal, 1000),
    [],
  );
  const deleteSurveyFromLocal = () => {
    localStorage.removeItem(CACHE_KEY);
  };
  const { mutate: getSurveyById } = api.post.getSurvey.useMutation({
    onSuccess: (data) => {
      if (!data.survey || data.error) {
        setError(true);
        errorToast(data.message);
      } else {
        setError(false);
        setSurveyData(data.survey);
        setNotesStateCache(data.survey.notes);
      }
    },
    onError: (data) => {
      setError(true);
      errorToast(data.message);
    },
  });

  function getSurveyHandler(e: React.FormEvent) {
    e.preventDefault();
    const input = { id: postId };
    getSurveyById(input);
  }

  const { mutate: updateSurvey } = api.post.updateSurvey.useMutation({
    onMutate(_variables) {
      setNotesStateCache(surveyData.notes);
    },
    onSuccess: (data) => {
      if (data.error) {
        errorToast(data.message);
      } else {
        successToast(data.message);
      }
    },
    onError: (error) => {
      if (error.message) {
        errorToast(error.message);
      }
    },
  });

  const updateSurveyHandler = () => {
    updateSurvey({
      id: surveyData.id,
      notes: surveyData.notes,
      created_at: surveyData.created_at,
    });
  };

  const reset = () => {
    setSurveyData({
      id: "",
      notes: "",
      created_at: "",
    });
    setNotesStateCache("");
    setPostId("");
    deleteSurveyFromLocal();
  };

  const tryToLeave = () => {
    if (surveyData.notes !== notesStateCache) {
      setDangerOpen(true);
    } else {
      reset();
    }
  };
  return (
    <>
      <Head>
        <title>Survey Notetaker</title>
        <meta name="description" content="Edit your survey notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!surveyData.id ? (
          <form
            className="flex flex-col gap-5 rounded-2xl bg-gray-200 p-5 shadow-2xl"
            onSubmit={getSurveyHandler}
          >
            <IdInput postId={postId} setPostId={setPostId} error={error} />
            <button
              className="w-1/3 self-end rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="flex w-full flex-col gap-5 p-5 shadow-2xl md:w-2/3 lg:w-1/2">
            <nav className="fixed left-0 top-0">
              <button
                aria-label="Leave"
                onClick={() => tryToLeave()}
                className="rounded-br-2xl bg-gray-100 hover:bg-gray-200 p-2 md:p-5 shadow-xl group"
              >
                <BackspaceIcon className="h-8 w-8 text-indigo-600 group-hover:text-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" />
              </button>
            </nav>
            <TextArea
              setNotes={setNotes}
              survey={surveyData}
              debouncedSaveSurveyToLocal={debouncedSaveSurveyToLocal}
            />
            <div className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:justify-between">
              <button
                onClick={() => {
                  setNotes(notesStateCache);
                }}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-2/12 rounded-md bg-indigo-600 px-3.5  py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
              >
                Revert
              </button>
              <button
                onClick={updateSurveyHandler}
                className="w-1/2 sm:w-1/3  md:w-1/4 lg:w-2/12 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </div>
        )}
        {dangerOpen && (
          <DangerDialog
            open={dangerOpen}
            setOpen={setDangerOpen}
            callback={reset}
          />
        )}
        <ToastContainer />
      </main>
    </>
  );
}

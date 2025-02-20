import { type Survey } from "~/types";

export default function TextArea({ setNotes, survey, debouncedSaveSurveyToLocal }: { setNotes: (notes: string) => void, survey: Survey, debouncedSaveSurveyToLocal: (survey: Survey) => void }) {
    return (
        <div className="w-full">
            <label htmlFor="editor" className="block text-sm/6 font-medium text-gray-900">
                Edit your notes
            </label>
            <div className="mt-2">

                <textarea
                    value={survey.notes}
                    onChange={(e) => {
                        setNotes(e.target.value);
                        debouncedSaveSurveyToLocal(survey);
                    }}
                    id="editor"
                    name="editor"
                    rows={4}
                    className="h-[50vh] text-base md:text-large lg:text-lg block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    defaultValue={''}
                />
            </div>
        </div>
    )
}

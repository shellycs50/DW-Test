import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import clsx from 'clsx'

export default function IdInput({ postId, setPostId, error }: { postId: string, setPostId: (postId: string) => void, error: boolean }) {
    return (
        <div>
            <label htmlFor="survey-id" className="block text-sm/6 font-medium text-gray-900">
                Enter your survey ID
            </label>
            <div className="mt-2 grid grid-cols-1">
                <input
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                    id="survey-id"
                    name="survey-id"
                    placeholder="888-8888-8888-8888"
                    aria-invalid={error}
                    className={clsx(`text-base md:text-lg lg:text-xl col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-3 pr-10
                        outline outline-1 -outline-offset-1 
                        focus:outline focus:outline-2 focus:-outline-offset-2 sm:pr-9 `,
                        {
                            'outline-red-300 placeholder:text-red-300 text-red-900 focus:outline-red-600': error,
                            'outline-gray-300 placeholder:text-gray-300 text-gray-900 focus:outline-gray-600': !error
                        })}
                />
                {error && (
                    <ExclamationCircleIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
                    />
                )}
            </div>
            {error && (
                <p id="survey-id-error" className="mt-2 text-sm text-red-600">
                    Not a valid survey ID.
                </p>
            )}
        </div>
    )
}

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const CommentsContainer = ({ comments }) => {
    const [showAll, setShowAll] = useState(false);

    if (!comments || comments.length === 0) return null;

    const visibleComments = showAll
        ? comments
        : [comments[comments.length - 1]];

    return (
        <section>
            <div className="mt-6 border-t-2 pt-4 space-y-3 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        Responses ({comments.length})
                    </h3>
                    {comments.length > 1 && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors dark:text-primary-400 dark:hover:text-primary-300"
                        >
                            {showAll ? (
                                <>
                                    <HiOutlineChevronUp className="h-4 w-4" />
                                    Collapse
                                </>
                            ) : (
                                <>
                                    <HiOutlineChevronDown className="h-4 w-4" />
                                    Expand all
                                </>
                            )}
                        </button>
                    )}
                </div>

                {visibleComments.map((cmt, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                        <figure className="p-2">
                            <img
                                src={cmt.userImg}
                                alt={cmt.userName}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </figure>
                        <div className="bg-gray-50 rounded-xl border border-gray-100 shadow-sm p-2 px-4 dark:bg-gray-700 dark:border-gray-600">
                            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 text-start">
                                {cmt.userName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 text-start">
                                {formatDistanceToNow(new Date(cmt.time), {
                                    addSuffix: true,
                                })}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 text-start">
                                {cmt.comment}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CommentsContainer;

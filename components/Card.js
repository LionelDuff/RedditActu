import { ArrowBigUpDash, ArrowBigDownDash, MessageSquare } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

export default function Card(props) {
  const date = new Date(props.created_utc * 1000);
  const timeInHours = date.getHours();
  const [score, setScore] = useState(props.score);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);

  // Function to handle upvote
  const handleUpvote = () => {
    if (!isUpvoted && !isDownvoted) {
      // If not upvoted or downvoted, add the upvote
      setScore(score + 1);
      setIsUpvoted(true);
    } else if (!isUpvoted && isDownvoted) {
      // If not upvoted but downvoted, remove the downvote
      setScore(score + 2);
      setIsDownvoted(false);
      setIsUpvoted(true);
    } else if (isUpvoted) {
      // If already upvoted, remove the upvote
      setScore(score - 1);
      setIsUpvoted(false);
    }
  };

  // Function to handle downvote
  const handleDownvote = () => {
    if (!isUpvoted && !isDownvoted) {
      // If not upvoted or downvoted, add the downvote
      setScore(score - 1);
      setIsDownvoted(true);
    } else if (isUpvoted && !isDownvoted) {
      // If upvoted but not downvoted, remove the upvote
      setScore(score - 2);
      setIsDownvoted(true);
      setIsUpvoted(false);
    } else if (isDownvoted) {
      // If already downvoted, remove the downvote
      setScore(score + 1);
      setIsDownvoted(false);
    }
  };

  return (
    <div className="flex flex-col p-4 w-9/10 h-auto items-center justify-center gap-6 border-b border-gray-400">
      <div className="flex items-center w-full gap-2">
        <p className="text-md font-bold text-indigo-600">{props.author}</p>
        <p className="text-lg font-bold">.</p>
        <p className="text-sm text-gray-400">
          {timeInHours > 24
            ? `${Math.floor(timeInHours / 24)} day${
                Math.floor(timeInHours / 24) > 1 ? "s" : ""
              } ago`
            : `${timeInHours} hour${timeInHours > 1 ? "s" : ""} ago`}
        </p>
      </div>
      <h2 className="text-xl font-bold">{props.title}</h2>
      <div className="flex flex-col items-centerw-8/10 h-auto gap-4">
        {props.is_video ? (
          <video
            className="w-full h-200 object-cover border-none rounded-lg"
            controls
            src={props.media.reddit_video.fallback_url}
          />
        ) : null}
        {props.post_hint === "image" && props.selftext === "" ? (
          <Image
            className="w-full h-200 object-contain border-none rounded-lg"
            src={props.url}
            alt={props.title}
            width={500}
            height={500}
            unoptimized
          />
        ) : null}
        {props.post_hint === "link" && props.selftext === "" ? (
          <Link
            href={props.url}
            className="w-full h-auto hover:text-indigo-600"
          >
            {props.title}
          </Link>
        ) : null}
        {props.selftext !== "" ? (
          <p className="text-md">{props.selftext}</p>
        ) : null}
      </div>
      <div className="flex w-full gap-2">
        <div className="flex items-center gap-2">
          <ArrowBigUpDash
            className={`cursor-pointer hover:text-green-500 ${
              isUpvoted ? "text-green-500" : ""
            }`}
            size={26}
            onClick={handleUpvote}
          />
          <p className="text-lg font-bold">{score}</p>
          <ArrowBigDownDash
            className={`cursor-pointer hover:text-red-500 ${
              isDownvoted ? "text-red-500" : ""
            }`}
            size={26}
            onClick={handleDownvote}
          />
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare size={26} />
          <p className="text-lg font-bold">{props.num_comments}</p>
        </div>
      </div>
    </div>
  );
}

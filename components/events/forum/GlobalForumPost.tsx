import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useTime } from "@/hooks/forum";
import { garamond, inter } from "@/utils/constants/fonts";
import cn from "clsx";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { BsArrowDownCircle } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { AiFillFire } from "react-icons/ai";
import Link from "next/link";

interface Props {
  post: ForumPost & {
    event_name: string;
    event_location_id: string;
    event_location_name: string;
    event_id: string;
  };
}

const GlobalForumPost = forwardRef<HTMLDivElement, Props>(function ForumPost(
  { post }: Props,
  ref
) {
  const tickInterval = useRef(1000 * 60);
  const now = useTime(tickInterval.current);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isTextOverflowing, setIsTextOverflowing] = useState(false);
  const [isReadingMore, setIsReadingMore] = useState(false);

  const LINE_HEIGHT = 25;
  const LINES = 3;
  const dateFormatter = new Intl.RelativeTimeFormat("en");
  const diff = now.getTime() - new Date(post.posted_at).getTime();
  const minutes = Math.round(diff / (1000 * 60));
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  let relativeTime = "";

  if (minutes < 1) {
    relativeTime = "just now";
  } else if (minutes < 60) {
    relativeTime = dateFormatter.format(-minutes, "minutes");
  } else if (hours < 24) {
    relativeTime = dateFormatter.format(-hours, "hours");
  } else {
    relativeTime = dateFormatter.format(-days, "days");
  }

  useEffect(() => {
    if (!contentRef.current) return;

    const element = contentRef.current;

    const observer = new ResizeObserver(() => {
      if (element.scrollHeight > LINE_HEIGHT * LINES) {
        setIsTextOverflowing(true);
      } else {
        setIsTextOverflowing(false);
      }
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const readMoreVisible = isTextOverflowing && !isReadingMore;

  return (
    <div
      ref={ref}
      className="py-8 px-6 border-[3px] border-primary-700 rounded-lg flex flex-col bg-tertiary-100 w-full"
    >
      <div className="flex items-center justify-between mb-2 flex-wrap">
        <div className="flex items-center gap-4">
          <p
            className={cn(garamond.className, "lg:text-4xl text-3xl font-bold")}
          >
            {post.author_name}
          </p>
        </div>
        <Link
          href={`/event/${post.event_id}`}
          className={cn(
            "text-xs lg:text-sm px-6 py-2 rounded-3xl bg-primary-800 text-primary-300 flex items-center gap-3",
            inter.className
          )}
        >
          Check out event <FiArrowUpRight />
        </Link>
      </div>
      <div className="flex items-center mb-2 gap-3">
        <Link
          href={`/event/${post.event_id}`}
          className={cn(
            "border px-3 rounded-xl text-xs py-[3px] font-medium bg-tertiary-100 border-primary-700 text-primary-700",
            inter.className
          )}
        >
          {post.event_name}
        </Link>
        <Link
          href={`/location/${post.event_location_id}`}
          className={cn(
            "flex items-center gap-1 border px-3 rounded-xl text-xs py-[3px] font-medium bg-tertiary-100 border-primary-700 text-primary-700",
            inter.className
          )}
        >
          <CiLocationOn />
          {post.event_location_name}
        </Link>
      </div>
      <div className="relative flex lg:items-center items-start justify-between gap-8">
        <motion.p
          ref={contentRef}
          initial={false}
          animate={{
            height: isReadingMore ? "auto" : LINE_HEIGHT * LINES,
          }}
          style={{
            lineHeight: `${LINE_HEIGHT}px`,
          }}
          className={cn(
            "lg:text-base text-sm overflow-hidden w-full font-medium",
            inter.className
          )}
        >
          {post.content}
        </motion.p>
      </div>
      {readMoreVisible && (
        <span className="font-bold tracking-widest text-lg leading-none">
          ...
        </span>
      )}
      <div
        className={cn("flex items-center gap-4 mt-4 justify-end", {
          "justify-between": isTextOverflowing,
        })}
      >
        {isTextOverflowing && (
          <button
            onClick={() => setIsReadingMore(!isReadingMore)}
            className="flex items-center gap-2 hover:bg-gray-400 hover:bg-opacity-20 w-fit rounded-xl p-1 font-semibold"
          >
            <motion.span
              initial={false}
              animate={{ rotate: !isReadingMore ? 0 : -180 }}
              transition={{ rotate: { ease: "linear" } }}
              className="flex items-center justify-center"
            >
              <BsArrowDownCircle />
            </motion.span>
            <span className="text-sm">
              Read {!isReadingMore ? "More" : "Less"}
            </span>
          </button>
        )}

        <div className="flex items-center gap-4">
          <span className="italic text-gray-500 text-sm">
            Posted {relativeTime}
          </span>
          <div className="flex items-center gap-1 bg-secondary-200 px-2 rounded-full">
            <AiFillFire className="text-orange-500" />
            <span className="font-bold text-secondary-500">{post.vote_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default GlobalForumPost;

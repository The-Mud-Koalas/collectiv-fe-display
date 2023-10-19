import React, { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useAnimationFrame } from "framer-motion";
import cn from "clsx";
import { useInView } from "framer-motion";
import { garamond, inter } from "@/utils/constants/fonts";
import { capitalize } from "@/utils/helpers/formatting/capitalize";

function getRandomInt(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function getRandom(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

const MAX_WIDTH = 300;

const FlyingWord = ({
  parent,
  frozen,
  entity,
  className,
  maxWordCount,
}: {
  parent: HTMLDivElement | null;
  frozen: boolean;
  entity: NamedEntity;
  className?: string;
  maxWordCount: number;
}) => {
  const ratio = entity.count / maxWordCount;
  const invRatio = 1 / ratio;
  const fontSize = Math.max((32 + maxWordCount * 2) * ratio, 12);
  const [isSpawned, setIsSpawned] = useState(false);
  const wordRef = useRef<HTMLDivElement>(null);
  const velocity = useRef({
    x: Math.random() < 0.5 ? 40 * invRatio : -40 * invRatio,
    y: Math.random() < 0.5 ? 40 * invRatio : -40 * invRatio,
  });

  useAnimationFrame((_, delta) => {
    if (wordRef.current && !frozen && parent && isSpawned) {
      const box = wordRef.current.getBoundingClientRect();
      const parentBounds = parent.getBoundingClientRect();
      const position = {
        x: box.left - parentBounds.left,
        y: box.top - parentBounds.top,
      };

      const deltaInSeconds = delta / 1000;
      const vx = velocity.current.x;
      const vy = velocity.current.y;

      const randomAccelerationX = getRandom(0.8, 1.2)
      const randomAccelerationY = getRandom(0.8, 1.2)

      if (position.x <= 0 && vx < 0) {
        velocity.current.x = -vx * randomAccelerationX;
      } else if (position.x + box.width >= parentBounds.width && vx > 0) {
        velocity.current.x = -vx * randomAccelerationX;
      }
      if (position.y <= 0 && vy < 0) {
        velocity.current.y = -vy * randomAccelerationY;
      } else if (position.y + box.height >= parentBounds.height && vy > 0) {
        velocity.current.y = -vy * randomAccelerationY;
      }

      if (Math.abs(velocity.current.x) > 120) {
        velocity.current.x = velocity.current.x * 0.8;
      }

      if (Math.abs(velocity.current.y) > 120) {
        velocity.current.y = velocity.current.y * 0.8;
      }

      const dx = velocity.current.x * deltaInSeconds;
      const dy = velocity.current.y * deltaInSeconds;

      wordRef.current.style.transform = `translateX(${
        position.x + dx
      }px) translateY(${position.y + dy}px)`;
    }
  });

  useEffect(() => {
    if (!isSpawned && wordRef.current && parent) {
      const box = wordRef.current.getBoundingClientRect();
      const parentBounds = parent.getBoundingClientRect();

      wordRef.current.style.transform = `translateX(${getRandomInt(
        0,
        parentBounds.width - box.width
      )}px) translateY(${getRandomInt(0, parentBounds.height - box.height)}px)`;
      setIsSpawned(true);
    }
  }, [parent, isSpawned]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      ref={wordRef}
      style={{ fontSize }}
      className={cn(
        "py-3 px-14 rounded-full absolute",
        inter.className,
        className
      )}
    >
      {capitalize(entity.word)}
    </motion.div>
  );
};

const WordCloud = ({ topWords }: { topWords: ForumTopWords }) => {
  const [isFrozen, setIsFrozen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxWordCount = useMemo(() => {
    let max = -Infinity;
    let entityGroup: "LOC" | "PER" | "MISC" | "ORG";
    for (entityGroup in topWords) {
      const group = topWords[entityGroup]!;
      for (let entity of group) {
        if (entity.count > max) {
          max = entity.count;
        }
      }
    }
    return max;
  }, [topWords]);

  const containerInView = useInView(containerRef, {});

  useEffect(() => {
    if (!containerInView && !isFrozen) {
      setIsFrozen(true);
    } else if (containerInView && isFrozen) {
      setIsFrozen(false);
    }
  }, [containerInView, isFrozen]);

  const noTopWords =
    !topWords.LOC?.length &&
    !topWords.MISC?.length &&
    !topWords.PER?.length &&
    !topWords.ORG?.length;

  return (
    <>
      <div
        ref={containerRef}
        className={cn("lg:w-3/4 w-11/12 relative overflow-hidden outline-primary-500", !noTopWords && "h-80")}
      >
        {topWords.LOC &&
          topWords.LOC.map((entity) => (
            <FlyingWord
              key={entity.word}
              entity={entity}
              frozen={isFrozen}
              maxWordCount={maxWordCount}
              parent={containerRef.current}
              className="border border-primary-700 bg-primary-800 text-primary-300 text-center font-medium"
            />
          ))}
        {topWords.PER &&
          topWords.PER.map((entity) => (
            <FlyingWord
              key={entity.word}
              entity={entity}
              frozen={isFrozen}
              maxWordCount={maxWordCount}
              parent={containerRef.current}
              className="text-secondary-500 bg-secondary-300 border-secondary-500 font-medium text-center"
            />
          ))}
        {topWords.ORG &&
          topWords.ORG.map((entity) => (
            <FlyingWord
              key={entity.word}
              entity={entity}
              frozen={isFrozen}
              maxWordCount={maxWordCount}
              parent={containerRef.current}
              className="text-primary-700 bg-tertiary-100 border-[2px] border-primary-700 font-medium text-center"
            />
          ))}
        {topWords.MISC &&
          topWords.MISC.map((entity) => (
            <FlyingWord
              key={entity.word}
              entity={entity}
              frozen={isFrozen}
              maxWordCount={maxWordCount}
              parent={containerRef.current}
              className="text-primary-700 border bg-primary-300 border-primary-300 font-medium text-center"
            />
          ))}
      </div>
    </>
  );
};

export default WordCloud;

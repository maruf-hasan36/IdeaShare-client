"use client";

import { topContributor } from "@/lib/api/user";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, BookOpen, Sparkles } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
};

export default function TopContributors() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const data = await topContributor();

        if (data) {
          setContributors(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-zinc-500">
        Loading contributors...
      </div>
    );
  }

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-indigo-50/40 to-white">
      {/* Background Glow */}

      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-300/20 blur-3xl rounded-full" />

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        className="text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
          <Sparkles size={14} />
          THIS WEEK'S STARS
        </div>

        <h2 className="mt-5 text-4xl md:text-5xl font-black text-zinc-900 tracking-tight">
          Top Contributors
        </h2>

        <p className="mt-3 text-zinc-500 max-w-md mx-auto text-sm">
          Meet the creators who are inspiring the community with their amazing
          lessons.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
        }}
        className="mt-14 flex flex-wrap justify-center gap-8 px-5"
      >
        {contributors.length ? (
          contributors.map((item, index) => (
            <motion.div
              key={item._id || index}
              variants={cardVariants}
              whileHover={{
                y: -10,
              }}
              className={`

                    relative group w-72 rounded-3xl p-6

                    backdrop-blur-xl

                    border border-white/60

                    bg-white/70

                    shadow-xl

                    transition-all duration-300

                    hover:shadow-indigo-200/50

                    ${index === 0 ? "ring-2 ring-yellow-400/40" : ""}

                    `}
            >
              {/* Rank */}

              <div
                className={`

                    absolute top-5 right-5

                    w-8 h-8 rounded-full

                    flex items-center justify-center

                    text-xs font-black text-white

                    shadow-lg


                    ${
                      index === 0
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                        : index === 1
                          ? "bg-zinc-400"
                          : "bg-orange-700"
                    }

                    `}
              >
                {index === 0 ? <Crown size={16} /> : index + 1}
              </div>

              {/* Avatar */}

              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 blur opacity-40 group-hover:opacity-70" />

                {item.image || item.userImage ? (
                  <img
                    src={item.image || item.userImage}
                    className="relative w-full h-full rounded-full object-cover border-4 border-white"
                  />
                ) : (
                  <div className="relative w-full h-full rounded-full flex items-center justify-center bg-zinc-200 text-3xl font-black">
                    {item.name?.charAt(0) || "C"}
                  </div>
                )}
              </div>

              <div className="text-center mt-5">
                <h3 className="text-lg font-black text-zinc-900">
                  {item.name || "Anonymous"}
                </h3>

                <p className="text-xs text-zinc-500 mt-1">
                  {item.title || "Creative Contributor"}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold">
                  <BookOpen size={14} />
                  {item.lessonCount || 0}
                  Lessons
                </div>
              </div>

              {index === 0 && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-yellow-400 text-white text-[10px] font-black shadow">
                  #1 CREATOR
                </div>
              )}
            </motion.div>
          ))
        ) : (
          <p className="text-zinc-400">No contributors found..</p>
        )}
      </motion.div>
    </section>
  );
}

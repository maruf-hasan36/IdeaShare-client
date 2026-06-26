"use client";

import React from "react";
import { Sparkles, Lightbulb, Users, HeartHandshake } from "lucide-react";

import { motion } from "framer-motion";

const featuresData = [
  {
    id: 1,
    title: "Wisdom Beyond Books",
    description:
      "Discover lessons shaped by real journeys, personal failures, and experiences that create meaningful growth.",
    icon: Lightbulb,
  },

  {
    id: 2,
    title: "Grow Faster Together",
    description:
      "Turn valuable experiences into actionable knowledge and move forward with confidence.",
    icon: Sparkles,
  },

  {
    id: 3,
    title: "A Community That Shares",
    description:
      "Connect with curious minds where stories, ideas, and experiences inspire positive change.",
    icon: Users,
  },

  {
    id: 4,
    title: "Trust & Authenticity",
    description:
      "A respectful space where every story matters and every voice gets the value it deserves.",
    icon: HeartHandshake,
  },
];

const containerVariants = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      staggerChildren: 0.15,
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

      damping: 18,
    },
  },
};

export default function PhilosophySection() {
  return (
    <section className="relative overflow-hidden py-24 px-5 bg-gradient-to-b from-white via-indigo-50/40 to-white">
      {/* Background Glow */}

      <div
        className="
absolute
top-10
left-1/2
-translate-x-1/2
w-[500px]
h-[500px]
bg-indigo-300/20
blur-[120px]
rounded-full
"
      />

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
        transition={{
          duration: 0.6,
        }}
        className="relative z-10 text-center max-w-3xl mx-auto mb-16"
      >
        <div
          className="
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-indigo-100
text-indigo-600
text-xs
font-bold
tracking-wide
"
        >
          <Sparkles size={14} />
          OUR MISSION
        </div>

        <h2
          className="
mt-5
text-4xl
md:text-5xl
font-black
tracking-tight
text-slate-900
"
        >
          Where Experience
          <span className="text-indigo-600"> Becomes Wisdom</span>
        </h2>

        <p
          className="
mt-4
text-slate-500
text-base
md:text-lg
"
        >
          Real stories. Real lessons. Real growth. A place where people share
          knowledge that actually changes lives.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
        }}
        className="
relative
z-10
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
max-w-7xl
mx-auto
"
      >
        {featuresData.map((feature) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
              }}
              className="

group

relative

rounded-3xl

p-7

bg-white/80

backdrop-blur-xl

border

border-white

shadow-xl

shadow-indigo-100/40

hover:shadow-indigo-200

transition-all

duration-300

"
            >
              {/* Icon */}

              <div
                className="

w-14

h-14

rounded-2xl

bg-gradient-to-br

from-indigo-500

to-purple-500

flex

items-center

justify-center

text-white

mb-6

shadow-lg

group-hover:scale-110

transition

"
              >
                <Icon size={26} />
              </div>

              <h3
                className="
text-xl
font-black
text-slate-900
mb-3
"
              >
                {feature.title}
              </h3>

              <p
                className="
text-sm
leading-relaxed
text-slate-500
"
              >
                {feature.description}
              </p>

              <div
                className="
absolute
bottom-0
left-0
w-full
h-1
rounded-full
bg-gradient-to-r
from-indigo-500
to-purple-500
opacity-0
group-hover:opacity-100
transition
"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

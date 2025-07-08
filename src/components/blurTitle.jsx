// src/components/blurTitle.jsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function BlurTitle({ title }) {
  return (
    <motion.h1
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {title}
    </motion.h1>
  );
}

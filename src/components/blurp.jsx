// src/components/blurTitle.jsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function Blurp({ title }) {
  return (
    <motion.h1
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        fontWeight: 'normal',
         textAlign: 'center',
      }}
    >
      {title}
    </motion.h1>
  );
}

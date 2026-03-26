// components/PageWrapper.jsx
import { motion } from 'framer-motion';

const PageWrapper = ({ children }: any) => (
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

export default PageWrapper;